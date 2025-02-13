import * as url from "node:url";

export class Photo{
  id
  url
  userId
  beachId
  routeId
  commentId
  excursionId


  constructor(id, url, userId, beachId, routeId, commentId, excursionId) {
    this.id = id;
    this.url = url;
    this.userId = userId;
    this.beachId = beachId;
    this.routeId = routeId;
    this.commentId = commentId;
    this.excursionId = excursionId;
  }

  static fromJson(json){
    return new Photo(
      json.id,
      json.url,
      json.userId,
      json.beachId,
      json.routeId,
      json.commentId,
      json.excursionId,
    );
  }
}
