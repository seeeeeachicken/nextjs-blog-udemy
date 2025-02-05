import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Head from "next/head";
import Layout , {siteTitle} from "./components/Layout";
import utilStyle from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import {getPostsData} from "../lib/post";

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData();//id, title, date, thumbnail
  console.log(allPostsData);

  return{
    props: {
      allPostsData, 
    },
  };
}





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({allPostsData}) {
  return (
   <Layout home>
    <Head>
      <title>
       {siteTitle}
      </title>
    </Head>
    <section className={utilStyle.headingMd}>
      <p>
        私はNextjsくっそできます。nexjsできすぎ日曜数学者です。
      </p>
    </section>

    <section>
      <h2>🔢藤田のブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id, title, date, thumbnail})=> (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`}
              className={styles.thumbnailImage}/>
            </Link>
            <Link href={`/posts/${id}`} legacyBehavior>
              <a className={utilStyle.boldText}>{title}</a>
            </Link>
            <br></br>
            <small className={utilStyle.lightText}>
              {date}
            </small>
          </article>
        ))}
      </div>
    </section>
   </Layout>
  );
}
