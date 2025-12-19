import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsFeature extends Struct.ComponentSchema {
  collectionName: 'components_elements_features';
  info: {
    description: '';
    displayName: 'Feature';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    is_external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'outline']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface ElementsStat extends Struct.ComponentSchema {
  collectionName: 'components_elements_stats';
  info: {
    description: '';
    displayName: 'Stat';
  };
  attributes: {
    label: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_abouts';
  info: {
    description: '';
    displayName: 'About';
  };
  attributes: {
    badge: Schema.Attribute.String;
    buttons: Schema.Attribute.Component<'elements.link', true>;
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    stats: Schema.Attribute.Component<'elements.stat', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    description: '';
    displayName: 'CTA';
  };
  attributes: {
    badge: Schema.Attribute.String;
    buttons: Schema.Attribute.Component<'elements.link', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFeatures extends Struct.ComponentSchema {
  collectionName: 'components_sections_features';
  info: {
    description: '';
    displayName: 'Features';
  };
  attributes: {
    features: Schema.Attribute.Component<'elements.feature', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Premium Real Estate Development'>;
    buttons: Schema.Attribute.Component<'elements.link', true>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsStats extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats';
  info: {
    description: '';
    displayName: 'Stats';
  };
  attributes: {
    stats: Schema.Attribute.Component<'elements.stat', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.feature': ElementsFeature;
      'elements.link': ElementsLink;
      'elements.stat': ElementsStat;
      'sections.about': SectionsAbout;
      'sections.cta': SectionsCta;
      'sections.features': SectionsFeatures;
      'sections.hero': SectionsHero;
      'sections.stats': SectionsStats;
    }
  }
}
