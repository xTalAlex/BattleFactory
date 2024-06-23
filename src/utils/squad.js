import countriesList from "countries-list";

export const squad = {
  props: {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    active_members: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    requires_approval: {
      type: Boolean,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      countries: countriesList.countries,
    };
  },

  computed: {
    countryName() {
      let country = null;
      if (this.country) country = this.countries[this.country.toUpperCase()];
      return country ? country.name : null;
    },

    countryFlag() {
      return this.country
        ? "https://flagcdn.com/32x24/" + this.country.toLowerCase() + ".png"
        : "";
    },

    rankLabel() {
      let label = this.rank;
      if (
        this.translations &&
        this.translations.veteran &&
        this.rank.toLowerCase() == "veteran"
      )
        label = this.translations.veteran;
      if (
        this.translations &&
        this.translations.ultra &&
        this.rank.toLowerCase() == "ultra"
      )
        label = this.translations.ultra;
      return this.rank >= 1200
        ? "Master " + this.rank
        : label[0].toUpperCase() + label.substring(1);
    },
  },
};
