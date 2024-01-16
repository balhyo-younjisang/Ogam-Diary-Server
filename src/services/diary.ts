import { database } from "@/config/firebase";
import { IDiary, IDiaryListViewDTO } from "@/interfaces/IDiary";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Inject, Service } from "typedi";

@Service()
export default class DiaryService {
  constructor(@Inject("logger") private logger) {}

  public async GetListView(email: string): Promise<IDiary[]> {
    try {
      const q = query(collection(database, email));
      const querySnapshot = await getDocs(q);
      const diaryList: IDiary[] = new Array();

      querySnapshot.forEach((doc) => {
        diaryList.push(doc.data() as IDiary);
      });

      return diaryList;
    } catch (e) {
      throw e;
    }
  }
}
