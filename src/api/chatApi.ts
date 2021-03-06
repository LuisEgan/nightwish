/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMessageInput = {
  id?: string | null;
  channelID: string;
  author: string;
  body: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ModelMessageConditionInput = {
  channelID?: ModelIDInput | null;
  author?: ModelStringInput | null;
  body?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelMessageConditionInput | null> | null;
  or?: Array<ModelMessageConditionInput | null> | null;
  not?: ModelMessageConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type Message = {
  __typename: "Message";
  id?: string;
  channelID?: string;
  author?: string;
  body?: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type UpdateMessageInput = {
  id: string;
  channelID?: string | null;
  author?: string | null;
  body?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type DeleteMessageInput = {
  id?: string | null;
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null;
  channelID?: ModelIDInput | null;
  author?: ModelStringInput | null;
  body?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelMessageFilterInput | null> | null;
  or?: Array<ModelMessageFilterInput | null> | null;
  not?: ModelMessageFilterInput | null;
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection";
  items?: Array<Message | null> | null;
  nextToken?: string | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type CreateMessageMutationVariables = {
  input?: CreateMessageInput;
  condition?: ModelMessageConditionInput | null;
};

export type CreateMessageMutation = {
  createMessage?: {
    __typename: "Message";
    id: string;
    channelID: string;
    author: string;
    body: string;
    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;
};

export type UpdateMessageMutationVariables = {
  input?: UpdateMessageInput;
  condition?: ModelMessageConditionInput | null;
};

export type UpdateMessageMutation = {
  updateMessage?: {
    __typename: "Message";
    id: string;
    channelID: string;
    author: string;
    body: string;
    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;
};

export type DeleteMessageMutationVariables = {
  input?: DeleteMessageInput;
  condition?: ModelMessageConditionInput | null;
};

export type DeleteMessageMutation = {
  deleteMessage?: {
    __typename: "Message";
    id: string;
    channelID: string;
    author: string;
    body: string;
    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;
};

export type GetMessageQueryVariables = {
  id?: string;
};

export type GetMessageQuery = {
  getMessage?: {
    __typename: "Message";
    id: string;
    channelID: string;
    author: string;
    body: string;
    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMessagesQuery = {
  listMessages?: {
    __typename: "ModelMessageConnection";
    items?: Array<{
      __typename: "Message";
      id: string;
      channelID: string;
      author: string;
      body: string;
      createdAt?: string | null;
      updatedAt?: string | null;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type MessagesByChannelIDQueryVariables = {
  channelID?: string | null;
  createdAt?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelMessageFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type MessagesByChannelIDQuery = {
  messagesByChannelID?: {
    __typename: "ModelMessageConnection";
    items?: Array<{
      __typename: "Message";
      id: string;
      channelID: string;
      author: string;
      body: string;
      createdAt?: string | null;
      updatedAt?: string | null;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type OnCreateMessageSubscription = {
  onCreateMessage?: {
    __typename: "Message";
    id: string;
    channelID: string;
    author: string;
    body: string;
    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?: {
    __typename: "Message";
    id: string;
    channelID: string;
    author: string;
    body: string;
    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?: {
    __typename: "Message";
    id: string;
    channelID: string;
    author: string;
    body: string;
    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;
};
