import { MasterService } from './../../../services/master/master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  constructor(private MasterService: MasterService, private Router: Router) { }

  params = this.Router.url.split('/')[3];

  form!: FormGroup;
  alert: boolean = false;
  msg: any = '';

  is30degree: boolean = true;
  is40degree: boolean = false;
  is50degree: boolean = false;

  checklist30degree: any;
  checklist40degree: any;
  checklist50degree: any;

  timelines: any;

  product: any;

  // Search and pagination
  search: any;

  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
  };

  // Modal
  temp30: any;
  temp40: any;
  temp50: any;
  productModal: any;
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
    })
    this.MasterService.showProduct(this.params).subscribe((res: any) => {
      this.form = new FormGroup({
        name: new FormControl(res.name),
      })
    })
    this.MasterService.getTimeline().subscribe((res: any) => {
      this.checklist30degree = res;
      this.checklist40degree = res;
      this.checklist50degree = res;
      this.checklist30degree = res.map((element: any) => {
        return { ...element, isCheck: false };
      });

      this.checklist40degree = res.map((element: any) => {
        return { ...element, isCheck: false };
      });

      this.checklist50degree = res.map((element: any) => {
        return { ...element, isCheck: false };
      });
    })
    this.MasterService.getProduct().subscribe((res: any) => {
      this.product = res;
      this.product.forEach((element: any) => {
        element.index = this.product.indexOf(element) + 1;
      })
    })
    this.MasterService.getByProduct(this.params).subscribe((res: any) => {
      this.checklist30degree = this.checklist30degree!.map((element: any) => {
        let isCheck = this.hasMatchingSchedule(element.id, res.temp.temp30);
        return { ...element, isCheck: isCheck };
      });
      this.checklist40degree = this.checklist40degree!.map((element: any) => {
        let isCheck = this.hasMatchingSchedule(element.id, res.temp.temp40);
        return { ...element, isCheck: isCheck };
      });
      this.checklist50degree = this.checklist50degree!.map((element: any) => {
        let isCheck = this.hasMatchingSchedule(element.id, res.temp.temp50);
        return { ...element, isCheck: isCheck };
      });
    })
  }
  updateChecklist30degree(event: any, index: any) {
    this.checklist30degree[index].isCheck = event.target.checked;
  }
  updateChecklist40degree(event: any, index: any) {
    this.checklist40degree[index].isCheck = event.target.checked;
  }
  updateChecklist50degree(event: any, index: any) {
    this.checklist50degree[index].isCheck = event.target.checked;
  }

  submit() {
    let in30degree = this.checklist30degree.filter((element: any) => {
      return element.isCheck == true;
    });
    let in40degree = this.checklist40degree.filter((element: any) => {
      return element.isCheck == true;
    });
    let in50degree = this.checklist50degree.filter((element: any) => {
      return element.isCheck == true;
    });
    if (this.form.value.name == '') {
      this.alert = true;
      this.msg = 'Please enter product name';
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
      return;
    }
    let data = {
      name: this.form.value.name,
      in30degree: in30degree,
      in40degree: in40degree,
      in50degree: in50degree
    };

    this.MasterService.updateProduct(this.params, data).subscribe((res: any) => {

    }, (err: any) => {
      this.alert = true;
      this.msg = err.error.message;
      setTimeout(() => {
        this.alert = false;
        this.msg = '';
      }, 3000);
    }, () => {
      this.Router.navigateByUrl('/master/product');
    })

  }
  classNames(...classes: any[]): any {
    return classes.filter(Boolean).join(" ");
  }
  nextDegree() {
    if (this.is30degree) {
      this.is30degree = false;
      this.is40degree = true;
    } else if (this.is40degree) {
      this.is40degree = false;
      this.is50degree = true;
    }
  }

  prevDegree() {
    if (this.is50degree) {
      this.is50degree = false;
      this.is40degree = true;
    } else if (this.is40degree) {
      this.is40degree = false;
      this.is30degree = true;
    }
  }

  getDataProduct(id: any) {
    this.MasterService.getByProduct(id).subscribe((res: any) => {
      this.checklist30degree = this.checklist30degree.map((element: any) => {
        let isCheck = this.hasMatchingSchedule(element.id, res.temp.temp30);
        return { ...element, isCheck: isCheck };
      });
      this.checklist40degree = this.checklist40degree.map((element: any) => {
        let isCheck = this.hasMatchingSchedule(element.id, res.temp.temp40);
        return { ...element, isCheck: isCheck };
      });
      this.checklist50degree = this.checklist50degree.map((element: any) => {
        let isCheck = this.hasMatchingSchedule(element.id, res.temp.temp50);
        return { ...element, isCheck: isCheck };
      });
    })
  }

  hasMatchingSchedule(timelineId: number, data: []): boolean {
    return data.some((schedule: any) => schedule.timelineId === timelineId);
  }

  dataModal(id: any) {
    let tempData: any;
    forkJoin(
      this.MasterService.getTimeline(),
      this.MasterService.getByProduct(id),
      this.MasterService.showProduct(id)
    ).subscribe(([res1, res2, res3]) => {
      this.timelines = res1;
      tempData = res2;
      this.temp30 = tempData.temp.temp30;
      this.temp40 = tempData.temp.temp40;
      this.temp50 = tempData.temp.temp50;
      this.productModal = res3;
    })
  }
}
