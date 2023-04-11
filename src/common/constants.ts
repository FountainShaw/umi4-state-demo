export enum VisibilityFiltersEnum {
  ALL = 'all',
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete'
};

export const VISIBILITY_FILTERS_OPTS = [
  { value: VisibilityFiltersEnum.ALL, text: '全部' },
  { value: VisibilityFiltersEnum.COMPLETED, text: '已完成' },
  { value: VisibilityFiltersEnum.INCOMPLETE, text: '未完成' },
];
