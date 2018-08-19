package judgels.jophiel;

import dagger.Component;
import javax.inject.Singleton;
import judgels.fs.aws.AwsModule;
import judgels.jophiel.hibernate.JophielHibernateDaoModule;
import judgels.jophiel.hibernate.JophielHibernateModule;
import judgels.jophiel.legacy.session.LegacySessionResource;
import judgels.jophiel.legacy.user.LegacyUserResource;
import judgels.jophiel.mailer.MailerModule;
import judgels.jophiel.profile.ProfileResource;
import judgels.jophiel.session.SessionResource;
import judgels.jophiel.user.MyResource;
import judgels.jophiel.user.UserResource;
import judgels.jophiel.user.account.UserAccountResource;
import judgels.jophiel.user.avatar.UserAvatarModule;
import judgels.jophiel.user.avatar.UserAvatarResource;
import judgels.jophiel.user.info.UserInfoResource;
import judgels.jophiel.user.password.UserResetPasswordModule;
import judgels.jophiel.user.rating.UserRatingResource;
import judgels.jophiel.user.registration.UserRegistrationModule;
import judgels.jophiel.user.registration.web.UserRegistrationWebResource;
import judgels.jophiel.user.superadmin.SuperadminCreator;
import judgels.jophiel.user.superadmin.SuperadminModule;
import judgels.jophiel.user.web.UserWebResource;
import judgels.recaptcha.RecaptchaModule;

@Component(modules = {
        AwsModule.class,
        JophielModule.class,
        JophielHibernateModule.class,
        JophielHibernateDaoModule.class,
        JophielPersistenceModule.class,
        MailerModule.class,
        RecaptchaModule.class,
        SuperadminModule.class,
        UserAvatarModule.class,
        UserRegistrationModule.class,
        UserResetPasswordModule.class})
@Singleton
public interface JophielComponent {
    SuperadminCreator superadminCreator();

    LegacyUserResource legacyUserResource();
    LegacySessionResource legacySessionResource();
    MyResource myResource();
    ProfileResource profileResource();
    SessionResource sessionResource();
    UserResource userResource();
    UserAccountResource userAccountResource();
    UserAvatarResource userAvatarResource();
    UserInfoResource userProfileResource();
    UserRegistrationWebResource userRegistrationWebResource();
    UserRatingResource userRatingResource();
    UserWebResource userWebResource();
    VersionResource versionResource();
}
