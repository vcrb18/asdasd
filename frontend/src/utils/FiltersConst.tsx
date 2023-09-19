export type filterOption =
  | filterExamsByStatus
  | filterExamsByReviewed
  | filterExamsByScreenshot;

export type filterExamsByStatus = "accepted" | "rejected" | "both";

export type filterExamsByReviewed = "reviewed" | "notReviewed" | "both";

export type filterExamsByScreenshot =
  | "withScreenshot"
  | "withoutScreenshot"
  | "both";

export type filterExamsByReported = 
| "reported"
| "toReport"
| "both";

export interface FilterComponentProps {
  conditionValue: filterOption;
  label: string;
  setCondition: (option: filterOption) => void;
  bothOption: string;
  trueOption: string;
  falseOption: string;
}

export interface FiltersComponentProps {
  filterComponentProps: FilterComponentProps[];
  handleApplyButton: () => void;
}
