/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      query GetProductIds {\n        allProducts {\n          id\n        }\n      }\n    ": types.GetProductIdsDocument,
    "\n      query GetProduct($id: ID!) {\n        Product(id: $id) {\n          id\n          name\n          description\n          img_url\n          price\n          power\n          quantity\n          brand\n          weight\n          height\n          width\n          length\n          model_code\n          colour\n        }\n      }\n    ": types.GetProductDocument,
    "\n      query GetProducts {\n        allProducts {\n          id\n          img_url\n          height\n          name\n          price\n          width\n        }\n      }\n    ": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetProductIds {\n        allProducts {\n          id\n        }\n      }\n    "): (typeof documents)["\n      query GetProductIds {\n        allProducts {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetProduct($id: ID!) {\n        Product(id: $id) {\n          id\n          name\n          description\n          img_url\n          price\n          power\n          quantity\n          brand\n          weight\n          height\n          width\n          length\n          model_code\n          colour\n        }\n      }\n    "): (typeof documents)["\n      query GetProduct($id: ID!) {\n        Product(id: $id) {\n          id\n          name\n          description\n          img_url\n          price\n          power\n          quantity\n          brand\n          weight\n          height\n          width\n          length\n          model_code\n          colour\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetProducts {\n        allProducts {\n          id\n          img_url\n          height\n          name\n          price\n          width\n        }\n      }\n    "): (typeof documents)["\n      query GetProducts {\n        allProducts {\n          id\n          img_url\n          height\n          name\n          price\n          width\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;