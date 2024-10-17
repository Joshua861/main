import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { StudentClient } from 'classcharts-api';
import { CLASSCHARTS_CODE, CLASSCHARTS_DOB } from '$env/static/private';
import fs from 'fs/promises';
import path from 'path';

export const GET = async (request) => {
	const lessons = await getLessons(CLASSCHARTS_CODE, CLASSCHARTS_DOB);

	console.log(lessons);

	const [y, x] = [1792, 828];

	const fontPath = path.join(process.cwd(), 'static', 'SpaceMono-Bold.ttf');
	const fontData = await fs.readFile(fontPath);

	const imagePath = path.join(process.cwd(), 'static', 'wp.png');
	const imageData = await fs.readFile(imagePath);
	const wpBase64 = imageData.toString('base64');

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					backgroundImage: `url(data:image/png;base64,${wpBase64})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				},
				children: {
					type: 'div',
					props: {
						children: {
							type: 'pre',
							props: {
								style: {
									fontSize: '40px',
									color: '#bba4ea'
								},
								children: lessons.data
									.map((lesson) => {
										return lesson.subject_name + '\n' + lesson.teacher_name;
									})
									.join('\n\n')
							}
						},
						style: {
							display: 'flex',
							borderRadius: '20px',
							padding: '50px',
							marginRight: 'auto',
							marginLeft: 'auto',
							marginTop: '400px'
						}
					}
				}
			}
		},
		{
			height: y,
			width: x,
			fonts: [
				{
					name: 'SpaceMono',
					data: await fontData,
					style: 'normal'
				}
			]
		}
	);

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: x
		}
	});

	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
};

function getTodaysDate() {
	const date = new Date();

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	// This arrangement can be altered based on how we want the date's format to appear.
	const currentDate = `${day}-${month}-${year}`;

	return currentDate;
}

async function getLessons(code: string, DOB: string) {
	const client = new StudentClient(code, DOB);
	await client.login();

	const lessons = await client.getLessons({
		date: getTodaysDate()
	});

	return lessons;
}
