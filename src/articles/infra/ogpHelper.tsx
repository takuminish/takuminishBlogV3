import satori from "satori";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const createOGP = async (title: string): Promise<string> => {
  const robotoArrayBuffer = await fs.readFile(
    path.resolve(path.join("font"), "NotoSansJP-Bold.ttf")
  );
  const svg = await satori(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to left, #7928CA, #FF0080)",
        borderRadius: "40px",
        width: 1200,
        height: 630,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "100px",
          alignItems: "center",
          textAlign: "center",
          borderRadius: "40px",
          backgroundColor: "#ffffff",
          width: 1100,
          height: 530,
        }}
      >
        <span
          style={{
            fontSize: "50px",
            fontWeight: 700,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: "50px",
            fontWeight: 700,
          }}
        >
          takuminishのブログ
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "NotoSansJP",
          // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
          data: robotoArrayBuffer,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png.toString("base64");
};

export default createOGP;
