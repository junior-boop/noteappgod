import AsyncStorage from "@react-native-async-storage/async-storage";
import initializeDB from "./initializeDB";
import { NoteSchema } from "./noteSchema";

import { type RxDatabase } from "rxdb";

export default async function NOTE_DB() {
  const key: string = "NOTES";
  const db: RxDatabase = await initializeDB();

  const dataOperation = {
    getAllData: async () => {
      try {
        const allkey = await AsyncStorage.getAllKeys();
        const allData = allkey.map(async (el) => {
          return await AsyncStorage.getItem(el);
        });

        return allData !== null ? allData : [];
      } catch (error) {
        console.log("get all data error :", error);
        return [
          {
            error: "il y a une erreur",
          },
        ];
      }
    },
    getData: async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // value previously stored
          return JSON.parse(value) as NoteSchema[];
        } else {
          await AsyncStorage.setItem(key, "[]");
          const v = await AsyncStorage.getItem(key);
          return v !== null ? (JSON.parse(v) as NoteSchema[]) : [];
        }
      } catch (err) {
        // error reading value
        console.error("Error retrieving data:", err);
      }
    },

    getDataItem: async (ID: string) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // value previously stored
          const data = JSON.parse(value) as NoteSchema[];
          const filter = data.filter((el) => el.ID === ID)[0];

          return filter;
        }
      } catch (err) {
        // error reading value
        console.error("Error retrieving data:", err);
        return { error: "Error retrieving data " };
      }
    },

    setData: async (value: NoteSchema) => {
      await db.notes.insert(value);

      try {
        const request = await AsyncStorage.getItem(key);
        const results = JSON.parse(request as string) as NoteSchema[];

        results.unshift(value);
        await AsyncStorage.setItem(key, JSON.stringify(results));
      } catch (err) {
        // saving error
        console.error("Error storing data:", err);
      } finally {
        console.log("data save");
      }
    },

    setDataItem: async (value: NoteSchema) => {
      const request = await AsyncStorage.getItem(key);
      const results = JSON.parse(request as string) as NoteSchema[];

      try {
        await db.notes.upsert(value);
        const filter = results.filter((el) => el.ID !== value.ID);
        const newArr = [value, ...filter];
        await AsyncStorage.setItem(key, JSON.stringify(newArr));
      } catch (err) {
        console.error("Error storing data:", err);
      } finally {
        console.log("data save");
      }
    },
  };

  return dataOperation;
}
