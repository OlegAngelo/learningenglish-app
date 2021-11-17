import React from 'react';
import Footer from '../../../../../shared/Footer/Footer';
import Header from '../../../../../shared/Header/Header';
import ListItem from './components/ListItem/ListItem';

const List = () => {
  return (
    <div style={{ paddingBottom: '4.9rem' }}>
      <Header hasBack={true} title="統合学習コース一覧" />
      <div style={{ marginTop: '3px' }}></div>
      <ListItem image="/images/person.jpg" title="Unit.1" description="自己紹介" />
      <ListItem image="/images/image2.jpg" title="Unit.2" description="会議" />
      <ListItem image="/images/image3.jpg" title="Unit.3" description="営業" />
      <ListItem image="/images/image4.jpg" title="Unit.4" description="プレゼン" />
      <ListItem image="/images/image5.jpg" title="Unit.5" description="ワークショップ" />
      <ListItem image="/images/image6.jpg" title="Unit.6" description="上司との面談" />
      <ListItem image="/images/image7.jpg" title="Unit.7" description="出張" />
      <ListItem image="/images/image8.jpg" title="Unit.8" description="契約" />
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default List;
