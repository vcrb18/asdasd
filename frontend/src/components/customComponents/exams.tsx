import { getCurrentUser } from "../../service/auth.service";
import ExamsTab from "../tabs/ExamsTab";
import ExamsTabGroupB from "../specialExamTable/ExamsTabGroupB";

function Exams() {
  const user = getCurrentUser();
  const isGroupB = user.UserGroups.find((userGroup: { groupId: string; }) => userGroup.groupId === 'B');
  return (
	<>
	  {isGroupB ? <ExamsTabGroupB /> : <ExamsTab />}
	</>
  );
};

export default Exams;
