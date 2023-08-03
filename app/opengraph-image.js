import { ImageResponse } from 'next/server'

//export twitter image 
export const config = {
    twitter: {
        card: 'summary_large_image',
    },
}


// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About tiqdev'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default function Image() {

    let date = new Date().toLocaleDateString();
    return new ImageResponse(
        (
            // tailwindcss imageresponse bacgkround image 

            <div tw="flex flex-col w-full h-full items-center justify-center bg-white relative">
                <div tw="flex flex-col flex-1 items-center justify-center w-full h-full absolute top-0 left-0">
                    <img
                        tw="w-full h-full object-cover"
                        src="https://namazakalk.vercel.app/og_back.jpg"
                        alt="emoji"
                    />
                </div>


                <div tw="flex flex-row flex-1 items-center justify-center">
                    <div tw="flex flex-col items-start justify-start  mr-[120px]">
                        <h1 tw='text-[26px] font-[800] text-center text-black m-0 p-0'>
                            Bugün Namaza Kalktın Mı?
                        </h1>

                        <h1 tw="text-[72px] font-bold text-center text-black m-0 p-0">
                            {date}
                        </h1>
                    </div>
                    <img
                        tw="w-[300px] h-[300px] drop-shadow-md"
                        src="https://namazakalk.vercel.app/sleepy.png"
                        alt="emoji"
                    />
                </div>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            //add twitter image config


        }
    )
}