// stores/offers.js
import { defineStore } from 'pinia'

export const useOfferStore = defineStore('offerStore', {
  state: () => ({
    offers: [
      {
        imgPrice: "/img-price2.png",
        title: "Periodic Maintenance",
        prices: "50",
        currency: "SAR",
        sale: "30% OFF",
        endDate: "Dec 3, 2024",
      },
      {
        imgPrice: "/img-price2.png",
        title: "Oil Change",
        prices: "60",
        currency: "SAR",
        sale: "20% OFF",
        endDate: "Jan 1, 2024",
      },
      {
        imgPrice: "/img-price2.png",
        title: "Oil Change",
        prices: "70",
        currency: "SAR",
        sale: "20% OFF",
        endDate: "Jan 1, 2022",
      },
      {
        imgPrice: "/img-price2.png",
        title: "Oil Change",
        prices: "80",
        currency: "SAR",
        sale: "20% OFF",
        endDate: "Jan 1, 3030",
      },
      {
        imgPrice: "/img-price2.png",
        title: "Oil Change",
        prices: "90",
        currency: "SAR",
        sale: "20% OFF",
        endDate: "Jan 1, 2026",
      },
      {
        imgPrice: "/img-price2.png",
        title: "Oil Change",
        prices: "100",
        currency: "SAR",
        sale: "20% OFF",
        endDate: "Jan 1, 2020",
      },
    ],
  }),

  getters: {
    getOfferByIndex: (state) => (index) => state.offers[index],
  },
  
})
