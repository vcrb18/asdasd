export type filterOption = filterExamsByStatus | filterExamsByReviewed | filterExamsByScreenshot;

export type filterExamsByStatus = "accepted" | "rejected" | "both";

export type filterExamsByReviewed = "reviewed" | "notReviewed" | "both";

export type filterExamsByScreenshot = "withScreenshot" | "withoutScreenshot" | "both";

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
