import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iList } from 'src/app/modal/iListInterface';
import { IProviderService } from 'src/app/provider/i-provider.service';

@Component({
  selector: 'app-create-register',
  templateUrl: './create-register.component.html',
  styleUrls: ['./create-register.component.scss'],
})
export class CreateRegisterComponent implements OnInit {
  readonly form = this.createForm();
  public SelectedLabTests:any;
  public providerList: iList[] = [
    { id: 1, name: 'SBI' },
    { id: 2, name: 'HDFC' },
    { id: 3, name: 'TATA_AIG' },
  ];
  public LabTests: iList[] = [
    { id: 1, name: 'ECG' },
    { id: 2, name: 'SCAN' },
    { id: 3, name: 'TATA_AIG' },
  ];
  public genderList: string[] = ['Male','Female','other' ];
  public stateList: any[];
  public statusList: iList[] = [
    { id: 1, name: 'Registered' },
    { id: 2, name: 'Appoinment confirmed' },
  ];
  constructor(public oService: IProviderService, public fb: FormBuilder) {
    this.oService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });
      console.log(this.stateList);
    });
  }

  ngOnInit(): void {
    console.log(this.form.get('InsuranceProvider'));
  }
  onFormSubmit(){
    if(this.form.invalid){
this.form.markAllAsTouched();
    }
  }
  createForm(): FormGroup {
    return this.fb.group({
      InsuranceProvider: [null, [Validators.required]],
      PolicyNo: [null, [Validators.required]],
      MemberId: [null],
      AgentName: [null],
      AgentCode: [null],
      AgentNo: [null, [Validators.maxLength(10)]],
      CustomerName: [null],
      Gender: [null, [Validators.required]],
      DOB: [null],
      CutomerNo: [null, [Validators.maxLength(10)]],
      city: [null, [Validators.required]],
      State: [null, [Validators.required]],
      Pincode: [null, [Validators.required,Validators.maxLength(10)]],
      LabTests: [null, [Validators.required]],
    });
  }
  reset() {
    this.form.reset()
  }
}
