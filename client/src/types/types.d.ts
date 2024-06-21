export type tokenType= {
    username:string,
}


// types.ts

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    bio: string;
    location: string;
    profileImage: string;
    backgroundImage: string;
    website: string;
    twitter: string;
    facebook: string;
    instagram: string;
    posts: Post[];
    comments: Comment[];
    likes: Like[];
    followers: Follow[];
    following: Follow[];
    messagesSent: Message[];
    messagesReceived: Message[];
    groups: Group[];
    groupMemberships: GroupMember[];
    eventsOrganized: Event[];
    eventAttendance: EventAttendee[];
    sentRequests: FriendRequest[];
    receivedRequests: FriendRequest[];
    activityLogs: ActivityLog[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Post {
    id: number;
    content: string;
    imageUrl: string;
    authorId: number;
    author: User;
    comments: Comment[];
    likes: Like[];
    tags: PostTag[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Comment {
    id: number;
    content: string;
    postId: number;
    authorId: number;
    post: Post;
    author: User;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Like {
    id: number;
    postId: number;
    userId: number;
    post: Post;
    user: User;
    createdAt: Date;
  }
  
  export interface Follow {
    id: number;
    followerId: number;
    followingId: number;
    follower: User;
    following: User;
    createdAt: Date;
  }
  
  export interface Message {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    sender: User;
    receiver: User;
    createdAt: Date;
  }
  
  export interface Group {
    id: number;
    name: string;
    description: string;
    ownerId: number;
    owner: User;
    members: GroupMember[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface GroupMember {
    id: number;
    groupId: number;
    userId: number;
    group: Group;
    user: User;
    joinedAt: Date;
  }
  
  export interface Event {
    id: number;
    name: string;
    description: string;
    date: Date;
    organizerId: number;
    organizer: User;
    attendees: EventAttendee[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface EventAttendee {
    id: number;
    eventId: number;
    userId: number;
    event: Event;
    user: User;
    joinedAt: Date;
  }
  
  export interface FriendRequest {
    id: number;
    senderId: number;
    receiverId: number;
    sender: User;
    receiver: User;
    status: string;
    createdAt: Date;
  }
  
  export interface Tag {
    id: number;
    name: string;
    posts: PostTag[];
  }
  
  export interface PostTag {
    postId: number;
    tagId: number;
    post: Post;
    tag: Tag;
  }
  
  export interface ActivityLog {
    id: number;
    userId: number;
    requestCount: string;
    user: User;
    createdAt: Date;
  }
  