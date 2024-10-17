import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { StudentClient } from 'classcharts-api';
import fs from 'fs/promises';
import path from 'path';

// Fallback values or fetch from environment
const CLASSCHARTS_CODE = process.env.CLASSCHARTS_CODE || '';
const CLASSCHARTS_DOB = process.env.CLASSCHARTS_DOB || '';

export const GET = async (request) => {
	if (!CLASSCHARTS_CODE || !CLASSCHARTS_DOB) {
		return new Response(
			'ClassCharts credentials not set. Please set CLASSCHARTS_CODE and CLASSCHARTS_DOB environment variables.',
			{ status: 500 }
		);
	}

	try {
		const lessons = await getLessons(CLASSCHARTS_CODE, CLASSCHARTS_DOB);
		console.log(lessons);
		const [y, x] = [1792, 828];
		const bg = '#2E145166';

		// Read font file
		const fontPath = path.join(process.cwd(), 'static', 'SpaceMono-Bold.ttf');
		const fontData = await fs.readFile(fontPath);

		// Read background image
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
							style: {
								backgroundColor: bg,
								padding: '20px',
								borderRadius: '10px'
							},
							children: {
								type: 'pre',
								props: {
									style: {
										fontSize: '48px',
										whiteSpace: 'pre-wrap',
										fontFamily: 'SpaceMono',
										color: 'white'
									},
									children: lessons.data
										.map((lesson) => `${lesson.subject_name}\n${lesson.teacher_name}`)
										.join('\n\n')
								}
							}
						}
					}
				}
			},
			{
				width: x,
				height: y,
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
	} catch (error) {
		console.error('Error generating timetable wallpaper:', error);
		return new Response('Error generating timetable wallpaper', { status: 500 });
	}
};

function getTodaysDate() {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
}

async function getLessons(code: string, DOB: string) {
	const client = new StudentClient(code, DOB);
	await client.login();
	const lessons = await client.getLessons({
		date: getTodaysDate()
	});
	return lessons;
}
