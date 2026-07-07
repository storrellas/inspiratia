class Item {
  id: number | null;
  userId: number | null;
  title: string;
  body: string;

  constructor(id: number | null, userId: number | null, title: string, body: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }
}

export default Item