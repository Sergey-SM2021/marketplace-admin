import { ILocalCategory } from "./store"

  // describe("true cases", () => {
  //   test("setIsOpenMode может сменить флаг на true на первом уровне вложенности, остальные флаги остаются false", () => {
  //     const category = {
  //       name: "Мебель",
  //       parentCategoryId: null,
  //       features: [],
  //       id: 93,
  //       isOpen: false,
  //       childCategories: [
  //         {
  //           parentCategory: {
  //             features: [],
  //             name: "Мебель",
  //             parentCategoryId: null,
  //             id: 93,
  //           },
  //           childCategories: [],
  //           features: [],
  //           name: "Шкаф",
  //           parentCategoryId: 93,
  //           id: 103,
  //           isOpen: false,
  //         },
  //         {
  //           parentCategory: {
  //             features: [],
  //             name: "Мебель",
  //             parentCategoryId: null,
  //             id: 93,
  //           },
  //           childCategories: [],
  //           features: [],
  //           name: "Столы",
  //           parentCategoryId: 93,
  //           id: 107,
  //           isOpen: false,
  //         },
  //       ],
  //     }

  //     setIsOpenMode(category, 93, true)
  //     expect(category.isOpen).toBeTruthy()
  //     expect(category.childCategories[0].isOpen).toBeFalsy()
  //     expect(category.childCategories[1].isOpen).toBeFalsy()
  //   })

  //   test("setIsOpenMode может сменить флаг на true втором уровне вложенности, остальные флаги остаются false", () => {
  //     const category = {
  //       name: "Мебель",
  //       parentCategoryId: null,
  //       features: [],
  //       id: 93,
  //       isOpen: false,
  //       childCategories: [
  //         {
  //           parentCategory: {
  //             features: [],
  //             name: "Мебель",
  //             parentCategoryId: null,
  //             id: 93,
  //           },
  //           childCategories: [],
  //           features: [],
  //           name: "Шкаф",
  //           parentCategoryId: 93,
  //           id: 103,
  //           isOpen: false,
  //         },
  //         {
  //           parentCategory: {
  //             features: [],
  //             name: "Мебель",
  //             parentCategoryId: null,
  //             id: 93,
  //           },
  //           childCategories: [],
  //           features: [],
  //           name: "Столы",
  //           parentCategoryId: 93,
  //           id: 107,
  //           isOpen: false,
  //         },
  //       ],
  //     }

  //     setIsOpenMode(category, 103, true)
  //     expect(category.childCategories[0].isOpen).toBeTruthy()
  //     expect(category.isOpen).toBeFalsy()
  //     expect(category.childCategories[1].isOpen).toBeFalsy()
  //   })

  //   test("setIsOpenMode может сменить флаг на true на третьем уровне вложенности", () => {
  //     const category = {
  //       name: "Мебель",
  //       parentCategoryId: null,
  //       features: [],
  //       id: 93,
  //       isOpen: false,
  //       childCategories: [
  //         {
  //           parentCategory: {
  //             features: [],
  //             name: "Мебель",
  //             parentCategoryId: null,
  //             id: 93,
  //           },
  //           childCategories: [],
  //           features: [],
  //           name: "Шкаф",
  //           parentCategoryId: 93,
  //           id: 103,
  //           isOpen: false,
  //         },
  //         {
  //           features: [],
  //           name: "Столы",
  //           parentCategoryId: 93,
  //           id: 107,
  //           isOpen: false,
  //           childCategories: [
  //             {
  //               parentCategory: {
  //                 features: [],
  //                 name: "Мебель",
  //                 parentCategoryId: null,
  //                 id: 107,
  //               },
  //               childCategories: [],
  //               features: [],
  //               name: "Столы",
  //               parentCategoryId: 93,
  //               id: 100029,
  //               isOpen: false,
  //             },
  //           ],
  //           parentCategory: {
  //             features: [],
  //             name: "Мебель",
  //             parentCategoryId: null,
  //             id: 93,
  //           },
  //         },
  //       ],
  //     }

  //     setIsOpenMode(category, 100029, true)
  //     expect(category.childCategories[1].childCategories[0].isOpen).toBeTruthy()
  //   })
  // })
  // describe("bad cases", () => {
  //   test("setIsOpenMode может сменить флаг на false на первом уровне вложенности", () => {
  //     const category = {
  //       name: "Мебель",
  //       parentCategoryId: null,
  //       features: [],
  //       id: 93,
  //       isOpen: true,
  //       childCategories: [
  //         {
  //           parentCategory: {
  //             features: [],
  //             name: "Мебель",
  //             parentCategoryId: null,
  //             id: 93,
  //           },
  //           childCategories: [],
  //           features: [],
  //           name: "Шкаф",
  //           parentCategoryId: 93,
  //           id: 103,
  //           isOpen: false,
  //         },
  //         {
  //           features: [],
  //           name: "Столы",
  //           parentCategoryId: 93,
  //           id: 107,
  //           isOpen: false,
  //           childCategories: [
  //             {
  //               parentCategory: {
  //                 features: [],
  //                 name: "Мебель",
  //                 parentCategoryId: null,
  //                 id: 107,
  //               },
  //               childCategories: [],
  //               features: [],
  //               name: "Столы",
  //               parentCategoryId: 93,
  //               id: 100029,
  //               isOpen: false,
  //             },
  //           ],
  //           parentCategory: {
  //             features: [],
  //             name: "Мебель",
  //             parentCategoryId: null,
  //             id: 93,
  //           },
  //         },
  //       ],
  //     }

  //     setIsOpenMode(category, 93, false)
  //     expect(category.isOpen).toBeFalsy()
  //   })
  // })
