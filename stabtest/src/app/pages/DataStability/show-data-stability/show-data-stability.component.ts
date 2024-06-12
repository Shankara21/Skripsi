import { MasterService } from './../../../services/master/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, } from '@angular/core';
import { forkJoin, window } from 'rxjs';
import { environment } from 'src/app/environtment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-show-data-stability',
  templateUrl: './show-data-stability.component.html',
  styleUrls: ['./show-data-stability.component.css']
})
export class ShowDataStabilityComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private MasterService: MasterService, private Router: Router, private spinner: NgxSpinnerService, private exportAsService: ExportAsService) { }

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'exportTable', // the id of html/table element
  }

  isShow: boolean = false;
  showIndex = 0;

  params = this.ActivatedRoute.snapshot.params['id'];
  paramsName = this.ActivatedRoute.snapshot.params['name'];
  paramsIndexData = this.Router.url.split('/')[2];
  isAnimate: boolean = true;
  dataStability: any;
  dataTransaction: any;
  dataModal: any;
  detailDataModal: any;
  dataDelete: any;
  listParameters: any;

  attachmentSensory!: File;
  attachmentAnalysis!: File;

  alert: boolean = false;
  alertMessage: boolean = false;
  msg = '';

  formUpdate!: FormGroup;

  // Search and pagination
  search: any;

  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
  };
  configLog = {
    id: 'customLog',
    itemsPerPage: 10,
    currentPage: 1,

  }

  dataModalTransaction: any;
  logCalculations: any

  form!: FormGroup;

  selectedData: any[] = [];


  ngOnInit() {
    this.formUpdate = new FormGroup({})
    this.spinner.show();
    setTimeout(() => {
      this.isAnimate = false;
    }, 1000);
    forkJoin([
      this.MasterService.showDataStability(this.params),
      this.MasterService.getTransactionByDataStability(this.params),
      this.MasterService.getStandardParameterByProduct(this.params),
    ]).subscribe(([res1, res2, res3]) => {
      if (res1 == null) {
        this.Router.navigateByUrl('/data-stability/' + this.paramsName);
      }
      this.dataStability = res1;
      this.dataTransaction = res2;
      this.listParameters = res3;

      this.dataTransaction?.forEach((element: any) => {
        element.index = this.dataTransaction?.indexOf(element) + 1;
        if (element.attachmentSensory != null) {
          element.urlSensory = environment.apiUrl + element.attachmentSensory;
          element.extensionSensory = element.attachmentSensory.split('.').pop();
        }
        if (element.attachmentAnalysis != null) {
          element.urlAnalysis = environment.apiUrl + element.attachmentAnalysis;
          element.extensionNutfact = element.attachmentAnalysis.split('.').pop();
        }
      })
    }, (error: any) => { }, () => { this.spinner.hide(); });
  }

  processAttachmentSensory(event: any) {
    this.attachmentSensory = event.target.files[0];
  }
  processattachmentAnalysis(event: any) {
    this.attachmentAnalysis = event.target.files[0];
  }

  updateDataStability() {
    const formData = new FormData();
    formData.append('eventId', this.detailDataModal.eventId);
    formData.append('dataStabilityId', this.detailDataModal.dataStabilityId);
    if (this.attachmentSensory) {
      formData.append('attachmentSensory', this.attachmentSensory, this.attachmentSensory.name);
    }
    if (this.attachmentAnalysis) {
      formData.append('attachmentAnalysis', this.attachmentAnalysis, this.attachmentAnalysis.name);
    }
    this.spinner.show();
    this.MasterService.updateDataTransactionStability(this.detailDataModal.id, formData).subscribe((res: any) => {
      this.alert = true;
      this.msg = res.message;
      this.ngOnInit();
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

  getDataModal(id: any) {
    this.spinner.show();
    forkJoin([
      this.MasterService.showTransaction(id),
      this.MasterService.getTransactionsDetailsByTransaction(id),
    ]).subscribe(([res1, res2]) => {
      let temp1, temp2;
      temp1 = res1;
      temp2 = res2;
      this.dataModal = temp2;

      this.detailDataModal = temp1;

      this.dataModal.forEach((element: any) => {
        this.selectedData.push({
          id: element.Parameter.id,
          name: element.Parameter.name,
          value: element.value,
        })
      })

      this.selectedData.forEach((element: any) => {
        this.formUpdate.addControl(element.id.toString(), new FormControl(element.value));
      })

      this.dataModal.forEach((element: any) => {
        element.index = this.dataModal.indexOf(element) + 1;
      })
      if (this.detailDataModal.attachmentSensory != null) {
        this.detailDataModal.urlSensory = environment.apiUrl + this.detailDataModal.attachmentSensory;
        this.detailDataModal.extensionSensory = this.detailDataModal.attachmentSensory.split('.').pop();
      }
      if (this.detailDataModal.attachmentAnalysis != null) {
        this.detailDataModal.urlAnalysis = environment.apiUrl + this.detailDataModal.attachmentAnalysis;
        this.detailDataModal.extensionNutfact = this.detailDataModal.attachmentAnalysis.split('.').pop();
      }
    }, (error: any) => { }, () => {

      this.spinner.hide();
    });
  }
  getDataModalDelete(id: any) {
    this.spinner.show();
    this.MasterService.showTransaction(id).subscribe((res: any) => {
      this.dataDelete = res;
      this.dataDelete.desc = this.dataDelete.Event.description.split('/')[1];
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

  delete(id: any) {
    this.spinner.show();
    this.MasterService.deleteTransaction(id).subscribe((res: any) => {
      this.alert = true;
      this.msg = res.message;
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
      this.ngOnInit();
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

  getDataModalTransaction(id: any) {
    this.spinner.show();
    this.MasterService.showTransactionDetails(id).subscribe((res: any) => {
      this.dataModalTransaction = res;
      this.form = new FormGroup({
        id: new FormControl(this.dataModalTransaction.id),
        value: new FormControl(this.dataModalTransaction.value),
        transactionId: new FormControl(this.dataModalTransaction.transactionId),
      })
      this.alertMessage = true;
      setTimeout(() => {
        this.alertMessage = false;
      }, 5000)
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

  updateData() {
    this.spinner.show();
    this.MasterService.updateTransactionDetails(this.form.value.id, this.form.value).subscribe((res: any) => {
      this.alert = true;
      this.msg = res.message;
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
      this.getDataModal(this.form.value.transactionId);
      this.ngOnInit();
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

  getLogCalculation(id: any) {
    this.spinner.show();
    this.MasterService.getLogCalculation(id).subscribe((res: any) => {
      this.logCalculations = res;
      this.logCalculations.forEach((element: any) => {
        element.index = this.logCalculations.indexOf(element) + 1;
      })
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

  updateWholeData(id: any) {
    this.spinner.show()
    this.MasterService.updateTransactionDetails(id, this.formUpdate.value).subscribe((res: any) => {
      this.alert = true;
      this.msg = 'Data has been updated';
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
      this.getDataModal(this.detailDataModal.id);
    }, (error: any) => { }, () => {
      this.spinner.hide();
    });
  }

  export() {

    this.exportAsService
      .save(this.exportAsConfig, `Report Document `)
      .subscribe(() => {
      });

  }

}
