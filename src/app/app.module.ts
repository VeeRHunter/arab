import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import{TermsAndConditionsPage} from '../pages/terms-and-conditions/terms-and-conditions';

import { FriendsPage } from '../pages/friends/friends';
import { NewsPage } from '../pages/news/news';
import { PagesPage } from '../pages/pages/pages';
import { Page } from '../pages/page/page';
import { GroupsPage } from '../pages/groups/groups';
import { GroupPage } from '../pages/group/group';
import { EventsPage } from '../pages/events/events';
import { VideosPage } from '../pages/videos/videos';
import { SettingsGeneralPage } from '../pages/settings-general/settings-general';
import { SettingsNotificationsPage } from '../pages/settings-notifications/settings-notifications';
import { SettingsPasswordPage } from '../pages/settings-password/settings-password';
import { SettingsPrivacyPage } from '../pages/settings-privacy/settings-privacy';
import { SettingsBlockingPage } from '../pages/settings-blocking/settings-blocking';
import { SettingsDeletePage } from '../pages/settings-delete/settings-delete';
import { PhotosPage } from '../pages/photos/photos';
import { SettingsPage } from '../pages/settings/settings';
import { MenuPage } from '../pages/menu/menu';
import { TabsPage } from '../pages/tabs/tabs';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';
import { MessagesPage } from '../pages/messages/messages';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { OnlinePage } from '../pages/online/online'
import { ContactUsPage } from '../pages/contact-us/contact-us'
import { FriendProfilePage }  from '../pages/friend-profile/friend-profile'
import { TrendingPage }  from '../pages/trending/trending'
import { CreatePagePage }  from '../pages/create-page/create-page'
import { CreateGroupPage }  from '../pages/create-group/create-group'
import { EditGroupPage }  from '../pages/edit-group/edit-group'
import { PostFeatursPage }  from '../pages/post-featurs/post-featurs'
import { DisplayPostPage } from '../pages/display-post/display-post'
import { CreateAlbumPage } from '../pages/create-album/create-album';
import { EditPagePage }  from '../pages/edit-page/edit-page'
import { CreateEventPage }  from '../pages/create-event/create-event'
import { EditEventPage }  from '../pages/edit-event/edit-event'
import { EventPage }  from '../pages/event/event'
import { SavedPage } from '../pages/saved/saved';
import { VideoPage } from '../pages/video/video';
import { AddVideoPage } from '../pages/add-video/add-video';
import { EditVideoPage } from '../pages/edit-video/edit-video';
import { InviteFriendPage } from '../pages/invite-friend/invite-friend';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MembersPage } from '../pages/members/members';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Globalization } from '@ionic-native/globalization';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { NotFound_404Page } from '../pages/not-found-404/not-found-404';
import { LatestVisitorsPage } from '../pages/latest-visitors/latest-visitors';
import { ViewAlbumPage } from '../pages/view-album/view-album';
import { EditAlbumPage } from '../pages/edit-album/edit-album';
import { YoutubePipe } from '../pipes/youtube/youtube';
import { FilePath } from '@ionic-native/file-path';
import { UploadImagePage } from '../pages/upload-image/upload-image';
import { SearchPage } from '../pages/search/search';
import { TimeProvider } from '../providers/time/time';
import { EditPostPage } from '../pages/edit-post/edit-post';
import { LongPressModule } from 'ionic-long-press';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SignupPage,
    LoginPage,
    TermsAndConditionsPage ,
    FriendsPage,
    MessagesPage,
    NewsPage,
    NotificationsPage,
    ProfilePage,
    ChatPage,
    MenuPage,
    SettingsPage,
    PagesPage,
    GroupsPage,
    EventsPage,
    PhotosPage,
    OnlinePage,
    VideosPage, AddVideoPage, VideoPage, EditVideoPage,
    GroupPage,
    Page,
    SettingsGeneralPage, SettingsNotificationsPage, SettingsPasswordPage,
    SettingsPrivacyPage, SettingsBlockingPage, SettingsDeletePage,
    ContactUsPage,
    FriendProfilePage,
    TrendingPage,
    CreatePagePage,
    CreateGroupPage,
    EditGroupPage,
    EditPagePage,
    PostFeatursPage,
    DisplayPostPage,
    MembersPage,
    InviteFriendPage, EditPostPage,
    SavedPage, SearchPage,
    CreateAlbumPage, EditAlbumPage, ViewAlbumPage,
    CreateEventPage, EditEventPage, EventPage,
    NotFound_404Page, LatestVisitorsPage,UploadImagePage,
    YoutubePipe
  ],
  imports: [
BrowserModule , LongPressModule, IonicModule.forRoot(MyApp), HttpModule, EmojiPickerModule.forRoot(), TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    NotificationsPage,
    LoginPage,
    SignupPage,
    TermsAndConditionsPage ,
    FriendsPage,
    MessagesPage,
    NewsPage,
    ProfilePage,
    ChatPage,
    MenuPage,
    SettingsPage,
    PagesPage,
    GroupsPage,
    EventsPage,
    PhotosPage,
    OnlinePage,
    VideosPage, AddVideoPage, VideoPage, EditVideoPage,
    GroupPage,
    Page,
    SettingsGeneralPage, SettingsNotificationsPage, SettingsPasswordPage,
    SettingsPrivacyPage, SettingsBlockingPage, SettingsDeletePage,
    ContactUsPage,
    FriendProfilePage,
    PostFeatursPage,
    TrendingPage,
    CreatePagePage,
    CreateGroupPage,
    EditGroupPage,
    EditPagePage,
    SavedPage, SearchPage,
    DisplayPostPage,
    MembersPage,
    CreateAlbumPage, EditAlbumPage, ViewAlbumPage,
    InviteFriendPage, EditPostPage,
    CreateEventPage, EditEventPage, EventPage,
    NotFound_404Page, LatestVisitorsPage, UploadImagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    PhotoViewer,
    FileTransfer,
    LaunchNavigator,
    Globalization,
    FilePath,
    File,
    YoutubeVideoPlayer,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
    TimeProvider,
  ]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'assets/lang/', '.json');
}
