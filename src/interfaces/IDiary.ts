export interface IDiary {
  situation: string;
  think: string;
  emotion: string;
  reaction: string;
  action: string;
  date: Date;
}

export interface IDiaryRequestDTO extends IDiary {
  email: string;
}

export interface IDiaryResponseDTO extends IDiary {
  id: string;
}

export interface IDiaryListViewDTO {
  email: string;
}

export interface IDiaryEditRequestDTO extends IDiary {
  diaryId: string;
  email: string;
}
