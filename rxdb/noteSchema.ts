export const TodoSchema = {
  version: 0,
  title: "note",
  description: "Le schema de Note",
  primaryKey: "ID", // <= the primary key is must
  type: "object",
  properties: {
    ID: {
      type: "string",
      maxLength: 100, // <- the primary key must have set maxLength
    },
    epingler: {
      type: "boolean",
    },
    createdBy: {
      type: "string",
    },
    note_content: {
      type: "string",
    },
    userId: {
      type: "string",
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
  },
};

export type NoteSchema = {
  Id?: string;
  note_content: string;
  userId?: string;
  createdAt?: Date;
  updatedAt: Date;
  createdBy: string;
  epingler: boolean;
};

/*

  ID        String   @id @default(uuid())
  titre     String
  contenu   String
  auteurID  String
  articleID String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

*/
