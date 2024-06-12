import { MasterService } from './../../../services/master/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transaction-data-stability',
  templateUrl: './transaction-data-stability.component.html',
  styleUrls: ['./transaction-data-stability.component.css']
})
export class TransactionDataStabilityComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private Router: Router, private MasterService: MasterService, private formBuilder: FormBuilder) { }

  isAnimate: boolean = true;

  params = this.Router.url.split('/')[2];
  paramsName = this.ActivatedRoute.snapshot.params['name'];
  paramsId = this.ActivatedRoute.snapshot.params['id'];

  alert: boolean = true;

  excelData: any;

  product: any;

  form!: FormGroup;
  listParameters: any = [];

  schedule: any;

  attachmentSensory!: File;
  attachmentAnalysis!: File;

  ngOnInit(): void {
    setTimeout(() => {
      this.alert = false;
    }, 5000);
    this.form = this.formBuilder.group({});
    setTimeout(() => {
      this.isAnimate = false;
    }, 1000);
    forkJoin([
      this.MasterService.showProductBySlug(this.params),
      this.MasterService.showDataStability(this.paramsId),
      this.MasterService.findNextCheckingEvent(this.paramsId)
    ]).subscribe(([res1, res2, res3]) => {
      this.product = res1;
      let tempData: any = res2
      this.MasterService.getStandardParameterByProduct(tempData.productDescId).subscribe((res: any) => {
        res.forEach((element: any) => {
          this.listParameters.push({
            id: element.Parameter.id,
            name: element.Parameter.name,
          });
        })
        this.listParameters.forEach((parameter: any) => {
          this.form.addControl(parameter.id.toString(), new FormControl(''));
        });
      })
      this.schedule = res3;
    });
  }
  
  processAttachmentSensory(event: any) {
    this.attachmentSensory = event.target.files[0];
  }
  processattachmentAnalysis(event: any) {
    this.attachmentAnalysis = event.target.files[0];
  }

  submit() {
    this.form.value['dataStabilityId'] = parseInt(this.paramsId);
    this.form.value['eventId'] = this.schedule.id;

    const formData = new FormData();

    Object.keys(this.form.value).forEach((key: any) => {
      formData.append(key, this.form.value[key]);
    })
    if (this.attachmentSensory) {
      formData.append('attachmentSensory', this.attachmentSensory, this.attachmentSensory.name);
    }
    if (this.attachmentAnalysis) {
      formData.append('attachmentAnalysis', this.attachmentAnalysis, this.attachmentAnalysis.name);
    }

    this.MasterService.createTransaction(formData).subscribe((res: any) => {
      this.Router.navigateByUrl(`/data-stability/${this.params}/show/${this.paramsId}`);
    })
  }
  ReadExcel(event: any) {
    let file = event?.target?.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    this.excelData = [];

    fileReader.onload = (e) => {
      let workbook = XLSX.read(fileReader.result, { type: 'binary' });
      let sheetNames = workbook.SheetNames;

      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

      for (const data of this.excelData) {
        const parameterId = data.id.toString();

        if (this.form.controls[parameterId]) {
          const floatValue = parseFloat(data.Value);

          if (!isNaN(floatValue)) {
            this.form.controls[parameterId].setValue(floatValue);
          } else {
            this.form.controls[parameterId].setValue("");
          }
        }
      }
    }
  }
}
