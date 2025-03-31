import {
  TIMELINE_STATUS_LIST,
  TIMELINE_TYPE_LIST,
} from '../interfaces/timelines.interface';

TIMELINE_TYPE_LIST;

export const timelineStatusToString = (timelineStatus: number) => {
  const timelineStatusFound = TIMELINE_STATUS_LIST.find(
    (item: any) => item.id === timelineStatus
  );
  return timelineStatusFound ? timelineStatusFound.name : '-';
};

export const timelineTypeSubjectToString = (timeLineTypeSubject: number) => {
  const timeLineTypeSubjectFound = TIMELINE_TYPE_LIST.find(
    (item: any) => item.id === timeLineTypeSubject
  );
  return timeLineTypeSubjectFound ? timeLineTypeSubjectFound.name : '-';
};
