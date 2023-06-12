import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from 'components/common/Avatar';
import {__} from 'utils/translation';
import Button from 'components/common/Button';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
} from 'react-share';



import './index.scss';



const SocialSharingButtons = () => {

  const { avatar, title, url } = useSelector((state) => state.config.data);
  var text = __("Привет! Посмотри конструктор, который делает сайт и приложение за 10 минут.");
  var texturl = __("Привет! Посмотри конструктор, который делает сайт и приложение за 10 минут.") + (url);
  var texttitleemail = __("Привет! Посмотри конструктор, который делает сайт и приложение за 10 минут.") + (title);
  var texttwitter = __("Привет! Посмотри конструктор, который делает сайт и приложение за 10 минут.");

  return (
    <React.Fragment>
      <div className="SocialSharingButtons">

        <Button onClick={() => {}} className="SocialSharingButtons_box ">
          {avatar &&
            <div className="SocialSharingButtons_box_avatar" image={avatar}>
              <Avatar image={avatar} />
            </div>}

          <div className="SocialSharingButtons_box_items" >
            <div className="SocialSharingButtons_title">{__("Все ваши ссылки настроены")}</div>
            <div className="SocialSharingButtons_container">


              <div className="SocialSharingButtons__some-network">
                <EmailShareButton
                  url={url}
                  subject={texttitleemail}
                  body={__("Привет! Посмотри конструктор, который делает сайт и приложение за 10 минут.")}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <EmailIcon size={45} round />
                </EmailShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <WhatsappShareButton
                  url={url}
                  title={title}
                  separator={__("Привет! Посмотри конструктор, который делает сайт и приложение за 10 минут.")}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <WhatsappIcon size={45} round />
                </WhatsappShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <ViberShareButton
                  url={url}
                  title={title}
                  separator={__("Привет! Посмотри конструктор, который делает сайт и приложение за 10 минут.")}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <ViberIcon size={45} round />
                </ViberShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <TelegramShareButton
                  url={url}
                  title={text}

                  className="SocialSharingButtons__some-network__share-button"
                >
                  <TelegramIcon size={45} round />
                </TelegramShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <VKShareButton
                  url={url}
                  image={avatar}
                  description={text}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <VKIcon size={45} round />
                </VKShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <FacebookShareButton
                  url={url}
                  quote={texturl}
                  hashtag="#sweety_link"
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <FacebookIcon size={45} round />
                </FacebookShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <FacebookMessengerShareButton
                  url={url}
                  appId="521270401588372"
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <FacebookMessengerIcon size={45} round />
                </FacebookMessengerShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <OKShareButton
                  url={url}
                  image={avatar}
                  description={text}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <OKIcon size={45} round />
                </OKShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <MailruShareButton
                  url={url}
                  title={title}
                  image={avatar}
                  description={text}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <MailruIcon size={45} round />
                </MailruShareButton>
              </div>



              <div className="SocialSharingButtons__some-network">
                <TwitterShareButton
                  url={url}
                  title={title}
                  via={texttwitter}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <TwitterIcon size={45} round />
                </TwitterShareButton>
              </div>


              <div className="SocialSharingButtons__some-network">
                <LinkedinShareButton
                  url={url}
                  title={title}
                  description={text}
                  className="SocialSharingButtons__some-network__share-button">
                  <LinkedinIcon size={45} round />
                </LinkedinShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <PinterestShareButton
                  url={url}
                  media={avatar}
                  description={text}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <PinterestIcon size={45} round />
                </PinterestShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <RedditShareButton
                  url={url}
                  title={title}
                  windowWidth={660}
                  windowHeight={460}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <RedditIcon size={45} round />
                </RedditShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <TumblrShareButton
                  url={url}
                  title={title}
                  tag="sweely_link"
                  caption={text}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <TumblrIcon size={45} round />
                </TumblrShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <LivejournalShareButton
                  url={url}
                  title={title}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <LivejournalIcon size={45} round />
                </LivejournalShareButton>
              </div>


              <div className="SocialSharingButtons__some-network">
                <WorkplaceShareButton
                  url={url}
                  quote={title}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <WorkplaceIcon size={45} round />
                </WorkplaceShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <LineShareButton
                  url={url}
                  title={title}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <LineIcon size={45} round />
                </LineShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <WeiboShareButton
                  url={url}
                  title={title}
                  image={avatar}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <WeiboIcon size={45} round />
                </WeiboShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <PocketShareButton
                  url={url}
                  title={title}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <PocketIcon size={45} round />
                </PocketShareButton>
              </div>

              <div className="SocialSharingButtons__some-network">
                <InstapaperShareButton
                  url={url}
                  title={title}
                  className="SocialSharingButtons__some-network__share-button"
                >
                  <InstapaperIcon size={45} round />
                </InstapaperShareButton>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </React.Fragment>
  );

}

export default SocialSharingButtons;
