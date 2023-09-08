import { getCurrentUser } from "../../service/auth.service";
import ExamsTab from "../tabs/ExamsTab";
import ExamsTabGroupB from "../specialExamTable/ExamsTabGroupB";

function Exams() {
  const user = getCurrentUser();
  console.log(user);
  const isGroupB = user.groups.find((groupId: string) => groupId === 'B');
  return (
	<>
	  {isGroupB ? <ExamsTabGroupB /> : <ExamsTab />}
	</>
  );
};

export default Exams;
