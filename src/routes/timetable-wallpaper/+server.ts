import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { StudentClient } from 'classcharts-api';
import { CLASSCHARTS_CODE, CLASSCHARTS_DOB } from '$env/static/private';

export const GET = async (event) => {
	let imageData, fontData;

	try {
		fontData = await event
			.fetch('/spacemono.ttf')
			.then((r) => r.blob().then((r) => r.arrayBuffer()));
		console.log('Font data fetched successfully');
	} catch (fontError) {
		console.error('Failed to fetch font data:', fontError);
		return new Response(
			JSON.stringify({ error: fontError.message, message: 'Failed to fetch font data.' }),
			{
				headers: { 'content-type': 'application/json' },
				status: 500
			}
		);
	}

	try {
		imageData = await event.fetch('/wp.png').then((r) => r.blob().then((r) => r.arrayBuffer()));
		console.log('Image data fetched successfully');
	} catch (imageError) {
		console.error('Failed to fetch image data:', imageError);
		return new Response(
			JSON.stringify({ error: imageError.message, message: 'Failed to fetch image data.' }),
			{
				headers: { 'content-type': 'application/json' },
				status: 500
			}
		);
	}

	try {
		const lessons = await getLessons(CLASSCHARTS_CODE, CLASSCHARTS_DOB);
		console.log('Lessons fetched:', lessons);
	} catch (lessonError) {
		console.error('Failed to fetch lessons:', lessonError);
		return new Response(
			JSON.stringify({ error: lessonError.message, message: 'Failed to fetch lessons.' }),
			{
				headers: { 'content-type': 'application/json' },
				status: 500
			}
		);
	}

	try {
		const lessons = await getLessons(CLASSCHARTS_CODE, CLASSCHARTS_DOB);

		console.log(lessons);

		const [y, x] = [1792, 828];

		const wpBase64 = Buffer.from(imageData).toString('base64');

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
								marginTop: '350px'
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
						data: fontData,
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

		// return new Response(null, {});
	} catch (error) {
		return new Response(JSON.stringify({ error, message: 'Error generating wallpaper.' }), {
			headers: {
				'content-type': 'application/json'
			},
			status: 500
		});
	}
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
