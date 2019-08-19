import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import {EditorModule} from 'primeng/editor';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import {InputMaskModule} from 'primeng/inputmask';
import {CheckboxModule} from 'primeng/checkbox';
import {SpinnerModule} from 'primeng/spinner';  
 
import { LedgerAccountRoutingModule } from './ledger-account-routing.module';
import { LedgerAccountComponent } from './ledger-account.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ToastModule,
		ReactiveFormsModule,
		TableModule,
		MultiSelectModule,
		DialogModule,
		DropdownModule,
		ButtonModule,
		InputTextModule,
		TabViewModule, 
		MessageModule,
		EditorModule,
		CodeHighlighterModule,
		InputMaskModule,
		CheckboxModule,
		SpinnerModule,
		LedgerAccountRoutingModule
		 
	],
	declarations: [LedgerAccountComponent]
})
export class LedgerAccountModule { }

