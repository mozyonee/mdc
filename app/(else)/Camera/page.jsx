import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const Camera = async () => {
	const session = await getServerSession(options);

	if(!session) {
		redirect("/api/auth/signin?callbackUrl=/Camera")
	}

	return (<div>
		<h1>Camera</h1>
		<p>In development</p>
	</div>);
}

export default Camera;