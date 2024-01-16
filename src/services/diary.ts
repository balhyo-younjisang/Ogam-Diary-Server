import { database } from "@/config/firebase";
import {
  IDiary,
  IDiaryEditRequestDTO,
  IDiaryRequestDTO,
  IDiaryResponseDTO,
} from "@/interfaces/IDiary";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { Inject, Service } from "typedi";

@Service()
export default class DiaryService {
  constructor(@Inject("logger") private logger) {}

  public async getListView(email: string, date: Date): Promise<IDiary[]> {
    try {
      const q = query(collection(database, email));
      const querySnapshot = await getDocs(q);
      const diaryList: IDiaryResponseDTO[] = new Array();

      querySnapshot.forEach((doc) => {
        const writedDate = new Date(doc.data().date.toDate());

        if (
          writedDate.getFullYear() === date.getFullYear() &&
          writedDate.getMonth() === date.getMonth() &&
          writedDate.getDate() === date.getDate()
        ) {
          diaryList.push({
            id: doc.id,
            ...doc.data(),
          } as IDiaryResponseDTO);
        }
      });

      return diaryList;
    } catch (e) {
      throw e;
    }
  }

  public async addDiary({
    email,
    situation,
    think,
    emotion,
    reaction,
    action,
    date,
  }: IDiaryRequestDTO): Promise<string> {
    try {
      const docRef = await addDoc(collection(database, email), {
        situation,
        think,
        emotion,
        reaction,
        action,
        date,
      });

      return docRef.id;
    } catch (e) {
      throw e;
    }
  }

  public async getDiary(
    email: string,
    diaryId: string
  ): Promise<IDiaryResponseDTO> {
    try {
      const diary = await getDoc(doc(database, email, diaryId));
      return { id: diary.id, ...diary.data() } as IDiaryResponseDTO;
    } catch (e) {
      throw e;
    }
  }

  public async editDiary({
    email,
    diaryId,
    situation,
    think,
    emotion,
    reaction,
    action,
    date,
  }: IDiaryEditRequestDTO) {
    try {
      const diary = doc(database, email, diaryId);
      await updateDoc(diary, {
        situation,
        think,
        emotion,
        reaction,
        action,
        date,
      });
      const updatedDiary = await getDoc(diary);

      return updatedDiary;
    } catch (e) {
      throw e;
    }
  }

  public async deleteDiary(email: string, diaryId: string) {
    try {
      await deleteDoc(doc(database, email, diaryId));
    } catch (e) {
      throw e;
    }
  }

  public async bookmarkDiary(email: string, diaryId: string) {
    try {
      const diary = doc(database, email, diaryId);
      await updateDoc(diary, {
        bookmark: true,
      });
      const updatedDiary = await getDoc(diary);

      return updatedDiary;
    } catch (e) {
      throw e;
    }
  }
}
