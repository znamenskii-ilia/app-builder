import { Component, Page } from "../../domain/entities";
import { PageRepo } from "./type";

const loadPage = async (pageId: string): Promise<Page> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const components: Record<string, Component> = {
    "box-1": {
      id: "box-1",
      component: "Box",
      name: "Root",
      props: {
        tag: "div",
        height: "full",
        width: "full",
        direction: "column",
        align: "stretch",
        justify: "start",
        gap: 2,
        padding: 0,
        background: "white",
        border: 0,
      },
      children: ["box-2", "box-3"],
    },
    "box-2": {
      id: "box-2",
      component: "Box",
      name: "Header",
      props: {
        tag: "header",
        height: "full",
        width: "full",
        direction: "row",
        align: "stretch",
        justify: "space-between",
        gap: 2,
        padding: 2,
        background: "black",
        border: 0,
      },
      children: ["heading-1", "button-1"],
    },
    "heading-1": {
      id: "heading-1",
      component: "Heading",
      name: "SiteName",
      props: {
        text: "John Doe",
        level: 1,
        align: "left",
        color: "white",
      },
      children: [],
    },
    "button-1": {
      id: "button-1",
      component: "Button",
      name: "ContactMe",
      props: {
        text: "Contact me",
        size: "medium",
        variant: "contained",
        color: "primary",
        disabled: false,
        leftIcon: undefined,
        rightIcon: undefined,
      },
      children: [],
      events: {},
    },
    "box-3": {
      id: "box-3",
      component: "Box",
      name: "Main",
      props: {
        tag: "main",
        height: "full",
        width: "full",
        direction: "row",
        align: "stretch",
        justify: "start",
        gap: 2,
        padding: 2,
        background: "white",
        border: 0,
      },
      children: ["box-4", "box-5"],
    },
    "box-4": {
      id: "box-4",
      component: "Box",
      name: "Sidebar",
      props: {
        tag: "aside",
        height: "full",
        width: "full",
        direction: "column",
        align: "stretch",
        justify: "start",
        gap: 2,
        padding: 0,
        background: "white",
        border: 0,
      },
      children: ["text-1"],
    },
    "text-1": {
      id: "text-1",
      component: "Text",
      name: "RoleDescription",
      props: {
        text: "Software engineer, Master of some Engineering sciences",
        align: "left",
        color: "black",
      },
      children: [],
    },
    "box-5": {
      id: "box-5",
      component: "Box",
      name: "Content",
      props: {
        tag: "section",
        height: "full",
        width: "full",
        direction: "column",
        align: "stretch",
        justify: "start",
        gap: 2,
        padding: 0,
        background: "white",
        border: 0,
      },
      children: ["heading-2", "text-2"],
    },
    "heading-2": {
      id: "heading-2",
      component: "Heading",
      name: "AboutMe",
      props: {
        text: "About me",
        level: 2,
        align: "left",
        color: "black",
      },
      children: [],
    },
    "text-2": {
      id: "text-2",
      component: "Text",
      name: "Bio",
      props: {
        text: "My name is Antony. I'm 33 years old. I've been working in IT (information technology) for a long time. Pretty good at software development, researching and overtiming. Very inspired by challenging math in tasks. But actually, lately I've been coding less and talking more. Probably, this is some kind of bell.",
        align: "left",
        color: "black",
      },
      children: [],
    },
  };

  // const components: Record<string, Component> = {
  //   "box-1": {
  //     id: "box-1",
  //     component: "Box",
  //     name: "Root",
  //     props: {
  //       height: "full",
  //       width: "full",
  //       direction: "column",
  //       align: "stretch",
  //       justify: "start",
  //       gap: 2,
  //       padding: 0,
  //       background: "white",
  //       border: 0,
  //     },
  //     children: ["heading-2", "text-bio-1", "text-bio-2"],
  //   },
  //   "heading-2": {
  //     id: "heading-2",
  //     component: "Heading",
  //     name: "AboutMe",
  //     props: {
  //       text: "About me",
  //       level: 2,
  //       align: "left",
  //       color: "black",
  //     },
  //     children: [],
  //   },
  //   "text-bio-1": {
  //     id: "text-bio-1",
  //     component: "Text",
  //     name: "Bio",
  //     props: {
  //       text: "My name is Antony. I'm 33 years old. I've been working in IT (information technology) for a long time. Pretty good at software development, researching and overtiming. Very inspired by challenging math in tasks. But actually, lately I've been coding less and talking more. Probably, this is some kind of bell.",
  //       align: "left",
  //       color: "black",
  //     },
  //     children: [],
  //   },
  //   "text-bio-2": {
  //     id: "text-bio-2",
  //     component: "Text",
  //     name: "Bio2",
  //     props: {
  //       text: "My name is Antony. I'm 33 years old. I've been working in IT (information technology) for a long time. Pretty good at software development, researching and overtiming. Very inspired by challenging math in tasks. But actually, lately I've been coding less and talking more. Probably, this is some kind of bell.",
  //       align: "left",
  //       color: "black",
  //     },
  //     children: [],
  //   },
  // };
  const page: Page = {
    id: pageId,
    applicationId: "1",
    name: "New Page",
    metadata: {
      title: "New Page",
    },
    children: components,
    childrenOrder: ["box-1"],
  };

  return page;
};

export const pageMemoryRepo: PageRepo = {
  loadPage,
};
