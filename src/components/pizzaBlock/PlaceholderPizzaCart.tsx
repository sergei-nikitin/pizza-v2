import React from 'react';
import ContentLoader from 'react-content-loader';

type PlaceholderPizzaCartProps = {
  className: string;
}

export const PlaceholderPizzaCart: React.FC<PlaceholderPizzaCartProps> = ({ className }) => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 240 460"
      backgroundColor="#fffcdb"
      foregroundColor="#f5efa8">
      <rect x="60" y="251" rx="0" ry="0" width="60" height="0" />
      <rect x="25" y="358" rx="5" ry="5" width="198" height="46" />
      {/* <rect x="27" y="380" rx="5" ry="5" width="197" height="28" /> */}
      <rect x="28" y="427" rx="5" ry="5" width="71" height="25" />
      <circle cx="124" cy="152" r="88" />
      <rect x="24" y="262" rx="5" ry="5" width="202" height="22" />
      <rect x="27" y="299" rx="6" ry="6" width="200" height="46" />
      <rect x="153" y="425" rx="5" ry="5" width="71" height="26" />
    </ContentLoader>
  );
};
