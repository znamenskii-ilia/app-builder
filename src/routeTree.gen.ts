/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ApplicationsRouteImport } from './routes/applications/route'
import { Route as IndexImport } from './routes/index'
import { Route as ApplicationsIndexImport } from './routes/applications/index'
import { Route as ApplicationsApplicationIdRouteImport } from './routes/applications/$applicationId/route'
import { Route as ApplicationsApplicationIdEntityTypeEntityIdImport } from './routes/applications/$applicationId/$entityType.$entityId'

// Create/Update Routes

const ApplicationsRouteRoute = ApplicationsRouteImport.update({
  id: '/applications',
  path: '/applications',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ApplicationsIndexRoute = ApplicationsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => ApplicationsRouteRoute,
} as any)

const ApplicationsApplicationIdRouteRoute =
  ApplicationsApplicationIdRouteImport.update({
    id: '/$applicationId',
    path: '/$applicationId',
    getParentRoute: () => ApplicationsRouteRoute,
  } as any)

const ApplicationsApplicationIdEntityTypeEntityIdRoute =
  ApplicationsApplicationIdEntityTypeEntityIdImport.update({
    id: '/$entityType/$entityId',
    path: '/$entityType/$entityId',
    getParentRoute: () => ApplicationsApplicationIdRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/applications': {
      id: '/applications'
      path: '/applications'
      fullPath: '/applications'
      preLoaderRoute: typeof ApplicationsRouteImport
      parentRoute: typeof rootRoute
    }
    '/applications/$applicationId': {
      id: '/applications/$applicationId'
      path: '/$applicationId'
      fullPath: '/applications/$applicationId'
      preLoaderRoute: typeof ApplicationsApplicationIdRouteImport
      parentRoute: typeof ApplicationsRouteImport
    }
    '/applications/': {
      id: '/applications/'
      path: '/'
      fullPath: '/applications/'
      preLoaderRoute: typeof ApplicationsIndexImport
      parentRoute: typeof ApplicationsRouteImport
    }
    '/applications/$applicationId/$entityType/$entityId': {
      id: '/applications/$applicationId/$entityType/$entityId'
      path: '/$entityType/$entityId'
      fullPath: '/applications/$applicationId/$entityType/$entityId'
      preLoaderRoute: typeof ApplicationsApplicationIdEntityTypeEntityIdImport
      parentRoute: typeof ApplicationsApplicationIdRouteImport
    }
  }
}

// Create and export the route tree

interface ApplicationsApplicationIdRouteRouteChildren {
  ApplicationsApplicationIdEntityTypeEntityIdRoute: typeof ApplicationsApplicationIdEntityTypeEntityIdRoute
}

const ApplicationsApplicationIdRouteRouteChildren: ApplicationsApplicationIdRouteRouteChildren =
  {
    ApplicationsApplicationIdEntityTypeEntityIdRoute:
      ApplicationsApplicationIdEntityTypeEntityIdRoute,
  }

const ApplicationsApplicationIdRouteRouteWithChildren =
  ApplicationsApplicationIdRouteRoute._addFileChildren(
    ApplicationsApplicationIdRouteRouteChildren,
  )

interface ApplicationsRouteRouteChildren {
  ApplicationsApplicationIdRouteRoute: typeof ApplicationsApplicationIdRouteRouteWithChildren
  ApplicationsIndexRoute: typeof ApplicationsIndexRoute
}

const ApplicationsRouteRouteChildren: ApplicationsRouteRouteChildren = {
  ApplicationsApplicationIdRouteRoute:
    ApplicationsApplicationIdRouteRouteWithChildren,
  ApplicationsIndexRoute: ApplicationsIndexRoute,
}

const ApplicationsRouteRouteWithChildren =
  ApplicationsRouteRoute._addFileChildren(ApplicationsRouteRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/applications': typeof ApplicationsRouteRouteWithChildren
  '/applications/$applicationId': typeof ApplicationsApplicationIdRouteRouteWithChildren
  '/applications/': typeof ApplicationsIndexRoute
  '/applications/$applicationId/$entityType/$entityId': typeof ApplicationsApplicationIdEntityTypeEntityIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/applications/$applicationId': typeof ApplicationsApplicationIdRouteRouteWithChildren
  '/applications': typeof ApplicationsIndexRoute
  '/applications/$applicationId/$entityType/$entityId': typeof ApplicationsApplicationIdEntityTypeEntityIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/applications': typeof ApplicationsRouteRouteWithChildren
  '/applications/$applicationId': typeof ApplicationsApplicationIdRouteRouteWithChildren
  '/applications/': typeof ApplicationsIndexRoute
  '/applications/$applicationId/$entityType/$entityId': typeof ApplicationsApplicationIdEntityTypeEntityIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/applications'
    | '/applications/$applicationId'
    | '/applications/'
    | '/applications/$applicationId/$entityType/$entityId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/applications/$applicationId'
    | '/applications'
    | '/applications/$applicationId/$entityType/$entityId'
  id:
    | '__root__'
    | '/'
    | '/applications'
    | '/applications/$applicationId'
    | '/applications/'
    | '/applications/$applicationId/$entityType/$entityId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ApplicationsRouteRoute: typeof ApplicationsRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ApplicationsRouteRoute: ApplicationsRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/applications"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/applications": {
      "filePath": "applications/route.tsx",
      "children": [
        "/applications/$applicationId",
        "/applications/"
      ]
    },
    "/applications/$applicationId": {
      "filePath": "applications/$applicationId/route.tsx",
      "parent": "/applications",
      "children": [
        "/applications/$applicationId/$entityType/$entityId"
      ]
    },
    "/applications/": {
      "filePath": "applications/index.tsx",
      "parent": "/applications"
    },
    "/applications/$applicationId/$entityType/$entityId": {
      "filePath": "applications/$applicationId/$entityType.$entityId.tsx",
      "parent": "/applications/$applicationId"
    }
  }
}
ROUTE_MANIFEST_END */
