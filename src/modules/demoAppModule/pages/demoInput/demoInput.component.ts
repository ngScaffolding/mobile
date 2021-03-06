import { Component, OnInit } from '@angular/core';
import { InputBuilderDefinition, OrientationValues, InputDetailTextBox, InputTypes, InputDetailDropdown, InputDetailTextArea, InputDetailToggleButton } from 'ngscaffolding-models';

@Component({
  templateUrl: './demoInput.component.html',
  styleUrls: ['./demoInput.component.scss'],
})
export class DemoInputComponent {

  inputDefinition1: InputBuilderDefinition = {
    orientation: OrientationValues.Horizontal,
    columnCount: 3,
    okButtonText: 'Save Me',
    okButtonIcon: 'checkmark',
    cancelButtonText: 'Cancel Me',
    cancelButtonIcon: 'close',

    customButtonText: 'Custom Here',
    customButtonIcon: 'fa-check',
    customButtonCallBack: () => alert('Call Back'),

    inputDetails: [
      <InputDetailTextBox>{
        label: 'Hello',
        name: 'hello',
        value: '',
        type: InputTypes.textbox,
        validateEmail: 'Email Please',
        help: 'Help Me. Please help me Please Mister.',
        validateRequired: 'Please say hello'
      },
      <InputDetailDropdown> {
        label: 'Linked Car Manufacturers',
        name: 'linkedSelectManufacturers',
        type: InputTypes.dropdown,
        referenceValueName: 'Cars',
        validateRequired: 'Select A Manufacturer',
        help: 'Basic Select Only'
      },
       <InputDetailDropdown> {
        label: 'Linked Models',
        name: 'linkedSelectModels',
        type: InputTypes.dropdown,
        referenceValueName: 'Cars',
        referenceValueSeedDependency: 'linkedSelectManufacturers',
        referenceValueChildLevel: 1,
        validateRequired: 'Select Me Please',
        selectFilter: true
      },
      {
        label: 'Date',
        name: 'date',
        value: new Date('2018-01-13T00:00:00.000Z'),
        type: InputTypes.date,
        validateRequired: 'Date Here Please'
      },
      {
        label: 'DateTime',
        name: 'datetime',
        value: new Date('2018-01-13T00:00:00.000Z'),
        type: InputTypes.datetime
      },
      {
        label: 'Time',
        name: 'time',
        value: new Date('2018-01-13T13:37:00.000Z'),
        type: InputTypes.time
      },
      <InputDetailTextArea>{
        label: 'TextArea',
        name: 'textarea',
        value: 'Lorem ipsum dolor sit amet',
        type: InputTypes.textarea,
        help: 'Enter lots of text here. Lots and lots.',
        rows: 5,
        validateRequired: 'Latin Here Please'
      },
      {
        label: 'CheckBox Here',
        name: 'checkbox',
        value: true,
        type: InputTypes.checkbox
      },
      {
        label: 'Chips Here',
        name: 'chips',
        value: ['one', 'two'],
        type: InputTypes.chips,
        validateRequired: 'Mmmm Chips'
      },
      <InputDetailToggleButton>{
        label: 'Switch Here',
        name: 'switch',
        value: true,
        type: InputTypes.switch
      }
    ]
  };

  inputModel1 = { hello: 'Sample', date: '', datetime: '', time: '', simpleSelectContinents: 'Europe' };


  constructor() { }


  notifyChanged(val: any) {
    var x = 0;
  }

}
