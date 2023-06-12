import { handleActions } from 'redux-actions';

import Theme from 'utils/theme';
import Background from 'utils/background';
import ButtonColor from 'utils/buttonColor';

import {
  LOADING_ERROR,  
  SET_DATA,
  CHANGE_THEME,
  CHANGE_BACKGROUND,
  CHANGE_BUTTON_COLOR,
  EDIT_BLOCK,
  REMOVE_BLOCK,
  EDIT_STORY,
  REMOVE_STORY,
  EDIT_AD,
  REMOVE_AD,
  EDIT_CATALOG,
  REMOVE_CATALOG,
  EDIT_MESSENGERS_DATA, 
  EDIT_SOCIAL_DATA,
  UPDATE_CONFIG_DATA,
  UPDATE_ALL_DATA,
  UPDATE_CONFIG_AVATAR,
  DATA_ALREADY_SAVED,
  USER_REGISTERED,
  HIDE_LANDING,
  ROTATE_BLOCK,
  ROTATE_STORY,
  ROTATE_CATALOG,
  SET_INSTAGRAM_FEED,
  SET_YOUTUBE_FEED,
  EDIT_RSS_DATA,
  IMAGE_UPLOADED,
  IMAGE_STORY_UPLOADED,
  IMPORT_CATALOG,
  CATALOG_FILTER
} from 'constants/actions';

const defaultTheme = new Theme({ name: 'Default' });
const initialState = {
  error: null,
  data: null,
  themes: [defaultTheme],
  currentTheme: defaultTheme,
  backgrounds: [],
  buttonColors: [],
  updated: false,
  config: {},
  account: {},
  showLanding: true,
  instagramFeed: [],
  url: null,
  storyGuid : null
};

const reducer = handleActions({
  [LOADING_ERROR]: (state, { error }) => ({
    ...state,
    error
  }),

  [SET_DATA]: (state, {
    themes,
    backgrounds,
    buttonColors,
    config,
    account,
    data
  }) => {
    const selectedTheme = themes.find((theme) => data.settings.theme === theme.name)
      || (themes[0] && { ...themes[0] })
      || { ...state.themes[0] };

    let currentTheme = new Theme(selectedTheme);

    if (data.settings.background) {
      const selectedBakground = backgrounds.find((background) => data.settings.background === background.name);
      if (selectedBakground)
        currentTheme = new Theme({ ...currentTheme, background: selectedBakground });
    }

    if (data.settings.color) {
      const selectedButtonColor = buttonColors.find((buttonColor) => data.settings.color === buttonColor.name);
      if (selectedButtonColor)
        currentTheme = new Theme({ ...currentTheme, button: selectedButtonColor });
    }

    return {
      ...state,
      themes: themes.map((theme) => new Theme(theme)),
      backgrounds: backgrounds.map((background) => new Background(background)),
      buttonColors: buttonColors.map((buttonColor) => new ButtonColor(buttonColor)),
      config,
      account,
      data: {
        ...data,
        counter: data.counter ? data.counter + 1 : 1
      },
      currentTheme,
      error: null,
      url: window.location.href
    };
  },

  

  [CHANGE_THEME]: (state, { name }) => {
    const currentTheme = state.themes.find((theme) => name === theme.name) || state.themes[0];
    return ({
      ...state,
      currentTheme,
      data: {
        ...state.data,
        settings: { ...state.data.settings, theme: name }
      },
      updated: true
    });
  },


  

  [CHANGE_BACKGROUND]: (state, { name }) => {
    const currentBackground = state.backgrounds.find((background) => name === background.name);
    const newTheme = new Theme({ ...state.currentTheme, background: currentBackground });

    return {
      ...state,
      currentTheme: newTheme,
      data: {
        ...state.data,
        settings: { ...state.data.settings, background: name }
      },
      updated: true
    };
  },

  [CHANGE_BUTTON_COLOR]: (state, { name }) => {
    const currentButtonColor = state.buttonColors.find((buttonColor) => name === buttonColor.name);
    const newTheme = new Theme({ ...state.currentTheme, button: currentButtonColor });

    return {
      ...state,
      currentTheme: newTheme,
      data: {
        ...state.data,
        settings: { ...state.data.settings, color: name }
      },
      updated: true
    };
  },

  [EDIT_BLOCK]: (state, { payload }) => {
    const currentBlock = state.data.blocks.find((block) => payload.guid === block.guid);
    const { blocks } = state.data;
    const newOrder = blocks.reduce((result, block) => (block.order > result ? block.order : result), 0) + 1;

    const { order, ...blockData } = payload;

    if (!currentBlock) {
      return {
        ...state,
        data: {
          ...state.data,
          blocks: [...blocks, { ...blockData, order: newOrder }]
        },
        updated: true
      };
    }
    return {
      ...state,
      data: {
        ...state.data,
        blocks: blocks.map((block) => (block.guid === blockData.guid ? { ...block, ...blockData } : block))
      },
      updated: true
    };
  },

  [REMOVE_BLOCK]: (state, { guid }) => ({
    ...state,
    data: {
      ...state.data,
      blocks: state.data.blocks.filter((block) => block.guid !== guid)
    },
    updated: true
  }),

  [EDIT_AD]: (state, { payload }) => {
    const currentAd = state.data.ads.find((ad) => payload.guid === ad.guid);
    const { ads } = state.data;
    const newOrder = ads.reduce((result, ad) => (ad.order > result ? ad.order : result), 0) + 1;

    const { order, ...adData } = payload;

    if (!currentAd) {
      return {
        ...state,
        data: {
          ...state.data,
          ads: [...ads, { ...adData, order: newOrder }]
        },
        updated: true
      };
    }
    return {
      ...state,
      data: {
        ...state.data,
        ads: ads.map((ad) => (ad.guid === adData.guid ? { ...ad, ...adData } : ad))
      },
      updated: true
    };
  },

  [EDIT_STORY]: (state, { payload }) => {
    const currentStory = state.data.stories.find((story) => payload.guid === story.guid);
    const { stories } = state.data;
    const newOrder = stories.reduce((result, story) => (story.order > result ? story.order : result), 0) + 1;

    const { order, ...storyData } = payload;

    if (!currentStory) {
      return {
        ...state,
        data: {
          ...state.data,
          stories: [...stories, { ...storyData, order: newOrder }]
        },
        updated: true
      };
    }
    return {
      ...state,
      data: {
        ...state.data,
        stories: stories.map((story) => (story.guid === storyData.guid ? { ...story, ...storyData } : story))
      },
      updated: true
    };
  },

  [REMOVE_STORY]: (state, { guid }) => ({
    ...state,
    data: {
      ...state.data,
      stories: state.data.stories.filter((story) => story.guid !== guid),
      catalogItems : state.data.catalogItems.filter(ci => !ci.storyGuid || ci.storyGuid !== guid)
    },
    updated: true
  }),

  [EDIT_CATALOG]: (state, { payload }) => {
    const currentItem = state.data.catalogItems.find((item) => payload.guid === item.guid);
    const { catalogItems } = state.data;
    const newOrder = catalogItems.reduce((result, item) => (item.order > result ? item.order : result), 0) + 1;

    const { order, ...catalogItemData } = payload;

    if (!currentItem) {
      return {
        ...state,
        data: {
          ...state.data,
          catalogItems: [...catalogItems, { ...catalogItemData, order: newOrder }]
        },
        updated: true
      };
    }
    return {
      ...state,
      data: {
        ...state.data,
        catalogItems: catalogItems.map((item) => (item.guid === catalogItemData.guid ? { ...item, ...catalogItemData } : item))
      },
      updated: true
    };
  },

  [REMOVE_CATALOG]: (state, { guid }) => ({
    ...state,
    data: {
      ...state.data,
      catalogItems: state.data.catalogItems.filter((item) => item.guid !== guid)
    },
    updated: true
  }),

  [EDIT_AD]: (state, { payload }) => {
    const currentAd = state.data.ads.find((ad) => payload.guid === ad.guid);
    const { ads } = state.data;
    const newOrder = ads.reduce((result, ad) => (ad.order > result ? ad.order : result), 0) + 1;

    const { order, ...adData } = payload;

    if (!currentAd) {
      return {
        ...state,
        data: {
          ...state.data,
          ads: [...ads, { ...adData, order: newOrder }]
        },
        updated: true
      };
    }
    return {
      ...state,
      data: {
        ...state.data,
        ads: ads.map((ad) => (ad.guid === adData.guid ? { ...ad, ...adData } : ad))
      },
      updated: true
    };
  },

  [REMOVE_AD]: (state, { guid }) => ({
    ...state,
    data: {
      ...state.data,
      ads: state.data.ads.filter((ad) => ad.guid !== guid)
    },
    updated: true
  }),

  [EDIT_SOCIAL_DATA]: (state, { data }) => ({
    ...state,
    data: {
      ...state.data,
      social: data
    },
    updated: true
  }),

  [EDIT_MESSENGERS_DATA]: (state, { data }) => ({
    ...state,
    data: {
      ...state.data,
      messengers: data
    },
    updated: true
  }),

  [UPDATE_ALL_DATA]: (state, { data }) => ({
    ...state,
    data: {
      ...state.data,
      data
    },
    updated: true
  }),

  [UPDATE_CONFIG_DATA]: (state, { title, description, googleAnalytics, constructor, seoSettings}) => ({
    ...state,
    data: {
      ...state.data,
      title,
      description,
      constructor,
      googleAnalytics,
      seoSettings,
    },
    updated: true
  }),

  [UPDATE_CONFIG_AVATAR]: (state, { avatar, avatarPreview, name }) => ({
    ...state,
    data: {
      ...state.data,
      avatar,
      avatarPreview,
      name,
    },
    updated: true
  }),

  [DATA_ALREADY_SAVED]: (state) => ({
    ...state,
    updated: false
  }),

  [USER_REGISTERED]: (state, { email = '' }) => ({
    ...state,
    account: {
      ...state.account,
      email,
      status: 'registered'
    }
  }),

  [HIDE_LANDING]: (state) => ({
    ...state,
    showLanding: false
  }),

  [ROTATE_BLOCK]: (state, { guid, order }) => {
    const { blocks } = state.data;
    let currentBlock = -1;
    blocks.sort((a, b) => b.order - a.order);
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].guid === guid)
        currentBlock = i;
    }

    let nextBlock = -1;
    if (order > 0 && currentBlock !== 0)
      nextBlock = currentBlock - 1;
    else if (order < 0 && currentBlock !== blocks.length - 1)
      nextBlock = currentBlock + 1;

    if (nextBlock > -1 && currentBlock > -1) {
      const nextOrder = blocks[nextBlock].order;
      blocks[nextBlock].order = blocks[currentBlock].order;
      blocks[currentBlock].order = nextOrder;
    }

    return {
      ...state,
      data: {
        ...state.data,
        blocks
      },
      updated: true
    };
  },

  [ROTATE_STORY]: (state, { guid, order }) => {
    const { stories } = state.data;
    let currentStory = -1;
    stories.sort((a, b) => b.order - a.order);
    for (let i = 0; i < stories.length; i++) {
      if (stories[i].guid === guid)
        currentStory = i;
    }

    let nextStory = -1;
    if (order > 0 && currentStory !== 0)
      nextStory = currentStory - 1;
    else if (order < 0 && currentStory !== stories.length - 1)
      nextStory = currentStory + 1;

    if (nextStory > -1 && currentStory > -1) {
      const nextOrder = stories[nextStory].order;
      stories[nextStory].order = stories[currentStory].order;
      stories[currentStory].order = nextOrder;
    }

    return {
      ...state,
      data: {
        ...state.data,
        stories
      },
      updated: true
    };
  },

  [ROTATE_CATALOG]: (state, { guid, order }) => {
    const { catalogItems } = state.data;
    let currentItem = -1;
    catalogItems.sort((a, b) => b.order - a.order);
    for (let i = 0; i < catalogItems.length; i++) {
      if (catalogItems[i].guid === guid)
        currentItem = i;
    }

    let nextItem = -1;
    if (order > 0 && currentItem !== 0)
      nextItem = currentItem - 1;
    else if (order < 0 && currentItem !== catalogItems.length - 1)
      nextItem = currentItem + 1;

    if (nextItem > -1 && currentItem > -1) {
      const nextOrder = catalogItems[nextItem].order;
      catalogItems[nextItem].order = catalogItems[currentItem].order;
      catalogItems[currentItem].order = nextOrder;
    }

    return {
      ...state,
      data: {
        ...state.data,
        catalogItems
      },
      updated: true
    };
  },

  [SET_INSTAGRAM_FEED]: (state, { title, data }) => {
    var store = {
      ...state.instagramFeeds
    };
    store[title] = data;
    return { 
      ...state,
      instagramFeeds: store
    };
  },

  [SET_YOUTUBE_FEED]: (state, { title, data }) => {
    var store = {
      ...state.youTubeFeeds
    };
    store[title] = data;
    return { 
      ...state,
      youTubeFeeds: store
    };
  },

  [EDIT_RSS_DATA]: (state, { data }) => ({
    ...state,
    data: {
      ...state.data,
      rss: data
    },
    updated: true
  }),

  [IMAGE_UPLOADED]: (state, { guid, image }) => {
    const currentAd = state.data.ads.find((ad) => guid === ad.guid);
    if (currentAd) {
      currentAd.image = image;
    }

    const currentBlock = state.data.blocks.find((block) => guid === block.guid);
    if (currentBlock) {
      currentBlock.image = image;
    }

    const currentStory = state.data.stories.find((story) => guid === story.guid);
    if (currentStory) {
      currentStory.image = image;
    }

    return state;
  },

  [IMAGE_STORY_UPLOADED]: (state, { guid, image }) => {
    
    const currentStory = state.data.stories.find((story) => guid === story.guid);
    if (currentStory) {
      currentStory.image = image;
    }

    return state;
  },

  [IMPORT_CATALOG]: (state, { items, storyGuid }) => {
    var catalogItems = state.data.catalogItems;

    if (!storyGuid) {
      catalogItems = items;
    } else {
      catalogItems = catalogItems.filter(ci => ci.storyGuid !== storyGuid)
      Array.prototype.push.apply(catalogItems, items)
    }

    return {
      ...state,
      data: {
        ...state.data,
        catalogItems
      },
      updated: true
    };
  },

  [CATALOG_FILTER] : (state, { storyGuid } ) => {
    return {
      ...state,
      storyGuid
    }
  }
}, initialState);

export default reducer;
