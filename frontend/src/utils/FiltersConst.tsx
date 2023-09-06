import { filterOption } from "./ExamTableConst";

export interface FilterComponentProps {
	conditionValue: filterOption;
	label: string;
	setCondition: (option: filterOption) => void;
	trueOption: string;
	falseOption: string;
}

export interface FiltersComponentProps{
	filterComponentProps: FilterComponentProps[];
	handleApplyButton: () =>  void;
}