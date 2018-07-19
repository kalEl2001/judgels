package judgels.service.actor;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.palantir.remoting.api.errors.RemoteException;
import java.time.Duration;
import java.util.Optional;
import judgels.jophiel.api.user.MyService;
import judgels.service.api.actor.ActorExtractor;
import judgels.service.api.actor.AuthHeader;

public final class CachingActorExtractor implements ActorExtractor {
    private final MyService myService;
    private final LoadingCache<AuthHeader, String> cache;

    public CachingActorExtractor(MyService myService) {
        this.myService = myService;
        this.cache = Caffeine.newBuilder()
                .maximumSize(1_000)
                .expireAfterWrite(Duration.ofMinutes(5))
                .build(this::extractJidUncached);
    }

    public Optional<String> extractJid(AuthHeader authHeader) {
        return Optional.ofNullable(cache.get(authHeader));
    }

    private String extractJidUncached(AuthHeader authHeader) {
        try {
            return myService.getMyself(authHeader).getJid();
        } catch (RemoteException e) {
            if (e.getStatus() != 401) {
                throw e;
            }
        }
        return null;
    }
}