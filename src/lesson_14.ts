enum NoteType {
  default = "default",
  confirmation_required = "confirmation required",
}

interface INote {
  id: string;
  title: string;
  description: string;
  completed_status: boolean;
  date_created: string;
  date_updated: string;
  type: NoteType;

  edit: (item: IPartialNote) => void;
  toggleStatus: () => void;
  validateTitleDescription: (item: IPartialNote) => boolean;
}

type IPartialNote = Partial<
  Pick<INote, "title" | "description" | "completed_status" | "type">
>;

interface IList {
  items: INote[];
  add: (item: INote) => void;
  remove: (id: string) => void;
  edit: (id: string, item: IPartialNote) => INote;
  getNote: (id: string) => INote | undefined;
  getAll: () => INote[];
  toggleNoteStatus: (id: string) => INote;
  getTotalNotes: () => number;
  getTotalUnfinishedNotes: () => number;
}

interface IListWithSearchOptions extends IList {
  search: (query: string) => INote[];
}
interface ISortOptions {
  sortBy: string;
  sortDirection: "asc" | "desc";
}

interface IListWithSortOptions extends IList {
  sort: (sortOptions: ISortOptions) => INote[];
}

class Note implements INote {
  public id: string;
  public date_created: string;
  public date_updated: string;

  constructor(
    public title: string,
    public description: string,
    public completed_status = false,
    public type: NoteType
  ) {
    this.id = window.crypto.randomUUID();
    this.date_created = new Date().toISOString();
    this.date_updated = new Date().toISOString();
  }

  public edit(item: IPartialNote): void {
    if (!this.validateTitleDescription(item)) {
      console.warn("Title and description cannot be empty");
      return;
    }
    this.title = item.title || this.title;
    this.description = item.description || this.description;
    this.completed_status =
      item.completed_status !== undefined
        ? item.completed_status
        : this.completed_status;
    this.date_updated = new Date().toISOString();
  }

  public toggleStatus(): void {
    if (this.type === NoteType.confirmation_required) {
      alert("Confirm editing a note!");
    }
    this.completed_status = !this.completed_status;
    this.date_updated = new Date().toISOString();
  }

  public validateTitleDescription(item: IPartialNote): boolean {
    return item.title?.trim() !== "" && this.description?.trim() !== "";
  }
}

class NoteList implements IList {
  public items: INote[] = [];
  public addMany(items: INote[]): void {
    this.items = this.items.concat(items);
  }
  public add(item: INote): void {
    if (!item.validateTitleDescription(item)) {
      console.warn("Title and description cannot be empty");
    }
    this.items.push(
      new Note(item.title, item.description, item.completed_status, item.type)
    );
  }

  public remove(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
  public edit(id: string, item: IPartialNote): INote {
    const index = this.items.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error("Note not found");
    }
    if (item.title?.trim() === "" || item?.description?.trim() === "") {
      console.warn("Title and description cannot be empty");
    }
    const note = this.items[index];
    if (note.type === NoteType.confirmation_required) {
      alert("Confirm editing a note!");
    }

    this.items[index].edit(item);

    return this.items[index];
  }
  public getNote(id: string): INote | undefined {
    return this.items.find((note) => note.id === id);
  }
  public getAll(): INote[] {
    return this.items;
  }
  public toggleNoteStatus(id: string): INote {
    const index = this.items.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error("Note not found");
    }
    const note = this.items[index];
    if (note.type === NoteType.confirmation_required) {
      alert("Confirm editing a note!");
    }
    this.items[index].toggleStatus();
    return this.items[index];
  }
  public getTotalNotes(): number {
    return this.items.length;
  }
  public getTotalUnfinishedNotes(): number {
    return this.items.filter((note) => !note.completed_status).length;
  }
}

class ListWithSearchOptions extends NoteList implements IListWithSearchOptions {
  public search(query: string): INote[] {
    if (query !== undefined) {
      query = query.toString();
    } else {
      console.warn("Search query must be defined");
      return this.items;
    }
    return this.items.filter((note) => {
      return (
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  }
}

class ListWithSortOptions extends NoteList implements IListWithSortOptions {
  public sort(sortOptions: ISortOptions): INote[] {
    if (sortOptions.sortBy === "completed_status") {
      return this.items.sort((a, b) => {
        if (a.completed_status < b.completed_status) {
          return sortOptions.sortDirection === "asc" ? -1 : 1;
        }
        if (a.completed_status > b.completed_status) {
          return sortOptions.sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    if (sortOptions.sortBy === "date_created") {
      return this.items.sort((a, b) => {
        if (a.date_updated < b.date_updated) {
          return sortOptions.sortDirection === "asc" ? -1 : 1;
        }
        if (a.date_updated > b.date_updated) {
          return sortOptions.sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    console.warn(
      "Invalid sort options. Sort options must be 'date_created' or 'completed_status' only"
    );
    return this.items;
  }
}

/* mock data ============================================================== */
const note_1 = new Note("Note 1", "Description 1", false, NoteType.default);
const note_2 = new Note(
  "Note 2",
  "Description 2",
  false,
  NoteType.confirmation_required
);
const note_3 = new Note("Note 3", "Description 3", false, NoteType.default);
const note_4 = new Note(
  "Note 4",
  "Description 4",
  false,
  NoteType.confirmation_required
);
const note_5 = new Note("Note 5", "Description 5", false, NoteType.default);
const note_6 = new Note(
  "Note 6",
  "Description 6",
  false,
  NoteType.confirmation_required
);
const note_7 = new Note("Note 7", "Description 7", false, NoteType.default);
const note_8 = new Note(
  "Note 8",
  "Description 8",
  false,
  NoteType.confirmation_required
);
const note_9 = new Note("Note 9", "Description 9", false, NoteType.default);
const note_10 = new Note(
  "Note 10",
  "Description 10",
  false,
  NoteType.confirmation_required
);

const mockNotes = new Array(
  note_1,
  note_2,
  note_3,
  note_4,
  note_5,
  note_6,
  note_7,
  note_8,
  note_9,
  note_10
);

// console.log("mockNotes :>> ", mockNotes);
if (window.localStorage.getItem("notes") === null) {
  window.localStorage.setItem("notes", JSON.stringify(mockNotes));
}

const notesFromStore = JSON.parse(window.localStorage.getItem("notes")!);

const notesList = new NoteList();
notesList.addMany(mockNotes);
console.log("notesList 1:>> ", notesList);
notesList.add(note_10);
notesList.remove("d7fafb60-0909-4955-b82d-2c7295777a5d");
console.log("notesList 2:>> ", notesList);
// notesList.edit("0f5341ef-4ffa-4d75-be93-54af4ce8b9e1", {
//   title: "Note 2 edited",
//   description: "Description 2 edited",
// });
// console.log("notesList 4:>> ", notesList);
// notesList.toggleNoteStatus("7c4d0d59-bb93-4c2e-bbc1-dfc4f57c97da");
const noteData = notesList.getNote("7c4d0d59-bb93-4c2e-bbc1-dfc4f57c97da");
console.log("noteData :>> ", noteData);
const allNotes = notesList.getAll();
console.log("allNotes :>> ", allNotes);
const numberOfNotes = notesList.getTotalNotes();
console.log("numberOfNotes :>> ", numberOfNotes);
const numberOfUnfinishedNotes = notesList.getTotalUnfinishedNotes();
console.log("numberOfUnfinishedNotes :>> ", numberOfUnfinishedNotes);

const listWithSearchOptions = new ListWithSearchOptions();
listWithSearchOptions.addMany(notesFromStore);
const searchResults_1 = listWithSearchOptions.search("Note 1");
console.log("searchResults_1 :>> ", searchResults_1);
const searchResults_2 = listWithSearchOptions.search("description");
console.log("searchResults_2 :>> ", searchResults_2);
const searchResults_3 = listWithSearchOptions.search();
console.log("searchResults_3 :>> ", searchResults_3);

const listWithSortOptions = new ListWithSortOptions();
listWithSortOptions.addMany(notesFromStore);
const sortResults_1 = listWithSortOptions.sort({
  sortBy: "date_created",
  sortDirection: "asc",
});
console.log("sortResults_1 :>> ", sortResults_1);
// listWithSortOptions.toggleNoteStatus("3bea0131-3b7a-4f8c-92c8-87931e141258");
const sortResults_2 = listWithSortOptions.sort({
  sortBy: "completed_status",
  sortDirection: "desc",
});
console.log("sortResults_2 :>> ", sortResults_2);
const sortResults_3 = listWithSortOptions.sort({
  sortBy: "title",
  sortDirection: "asc",
});
console.log("sortResults_3 :>> ", sortResults_3);
