package judgels.uriel.persistence;

import java.util.List;
import java.util.Optional;
import judgels.persistence.Dao;

public interface ContestProblemDao extends Dao<ContestProblemModel> {
    Optional<ContestProblemModel> selectByContestJidAndProblemJid(String contestJid, String problemJid);
    Optional<ContestProblemModel> selectByContestJidAndProblemAlias(String contestJid, String problemAlias);
    List<ContestProblemModel> selectAllByContestJid(String contestJid);
    List<ContestProblemModel> selectAllOpenByContestJid(String contestJid);
}