/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { connectToDatabase } from "../libs/mongodb";
import { Background_music } from "../components";
import { useState } from "react";

export default function Home({ users, score_goal, usersranked }) {
  let totalscore = 0;
  users.forEach((user) => {
    totalscore +=
      user.scores[0].easy +
      user.scores[0].normal +
      user.scores[0].hard +
      user.scores[0].oni +
      user.scores[0].uraoni;
  });
  var completion = Math.round(
    Math.min((totalscore * 100) / score_goal.score_goal, 100)
  );
  const [pozolero, setPozolero] = useState(false);
  const [playSubmitSound, setPlaySubmitSound] = useState(false);
  const musicHandler = () => {
    setPlaySubmitSound(!playSubmitSound);
  };

  return (
    <div className="font-taikofont scrollbar-hide">
      <Background_music
        src="/sound/pap.mp3"
        play={playSubmitSound}
        onFinish="loop"
      />
      <div className="text-center">
        <div className="container w-[90%] h-[90%] md:w-full md:h-full mx-auto py-5 text-center relative">
          <button
            className="cursor-default"
            onClick={() => {
              musicHandler();
            }}
          >
            <div className={playSubmitSound ? "pantotzka" : ""}>
              <Image
                draggable={false}
                alt=""
                src={playSubmitSound ? "/pantotzka.png" : "/pantaikologo2.png"}
                width={playSubmitSound ? 1056 / 2 : 1290 / 2}
                height={576 / 2}
                layout="intrinsic"
                className={
                  playSubmitSound
                    ? "paper_bounce_logo absolute top-10 my-0"
                    : ""
                }
              />
            </div>
          </button>
        </div>
      </div>
      <div className="container mx-auto my-auto py-auto w-[90%] xl:w-[55%]">
        <div className="block">
          <div className="border-4 border-black shadow-2xl rounded-lg my-2 bg-gray-600">
            <div
              className={
                completion < 100
                  ? "rounded-lg py-10 bg-pink-300"
                  : "rounded-lg py-10 rainbow_bg_animated"
              }
              style={{ width: completion + "%" }}
            ></div>
          </div>
          <div className="text-5xl z-20 relative top-[-4.7rem] mx-4 text-transparent text_border_black w-full text-center">
            {completion}%
          </div>
          <div className="text-5xl z-20 relative top-[-3rem] text-center">
            <span>{totalscore + "点"}</span>/
            <span>{score_goal.score_goal + "点"}</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto w-[95%] xl:w-[55%]">
        <div className="block mx-auto bg-orange-200 border-black rounded-lg border-4">
          <div className="relative w-[14rem] h-[2rem] bottom-8 z-20">
            <div className="absolute leaderboards-text w-[14rem] h-[3rem]" />
          </div>
          <div className="relative">
            <table className="table w-full overflow-hidden table-auto">
              <thead className="table-header-group text-2xl">
                <tr className="table-row w-full">
                  <th className="table-cell sm:w-[16%] sm:overflow-auto text-left pb-5 pt-1 pl-2 text-xl sm:text-2xl">
                    Rank
                  </th>
                  <th className="table-cell w-[50%] sm:w-[34%] text-center sm:text-left pb-5 pt-1 text-xl sm:text-2xl">
                    User
                  </th>
                  <th className="table-cell w-[50%] sm:w-[50%] text-center sm:text-left pb-5 pt-1 text-xl sm:text-2xl">
                    Score
                  </th>
                </tr>
              </thead>
              {usersranked.map((user, id) => (
                <thead key={user.username} className="table-row-group text-lg">
                  <tr
                    className={
                      (id + 1) % 2 == 0
                        ? "table-row bg-orange-400 bg-opacity-20"
                        : "table-row bg-orange-300"
                    }
                  >
                    <td className="table-cell sm:pl-8 py-2 text-center sm:text-left">
                      {id + 1}
                    </td>
                    <td className="table-cell py-2 text-center break-all overflow-ellipsis sm:text-left sm:overflow-auto sm:pl-1">
                      {user.username}
                    </td>
                    <td className="table-cell py-2">
                      <div className="md:inline-block md:w-[31%] text-center sm:text-left">
                        {user.scores[0].easy +
                          user.scores[0].normal +
                          user.scores[0].hard +
                          user.scores[0].oni +
                          user.scores[0].uraoni +
                          "点"}
                      </div>
                      <div className="md:inline-block md:w-[69%] text-center sm:text-left">
                        <div className="object-contain inline-block w-8 sm:w-10 tooltip top">
                          <span
                            className={
                              user.scores[0].easy > 0 ? "tiptext" : "hidden"
                            }
                          >
                            {user.scores[0].easy + "点"}
                          </span>
                          <img
                            draggable={false}
                            alt=""
                            src="/difficulty_Easy.png"
                            className={
                              user.scores[0].easy > 0
                                ? "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 select-none pointer-events-none"
                                : "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 filter grayscale contrast-200 select-none pointer-events-none"
                            }
                          />
                        </div>
                        <div className="object-contain inline-block w-8 sm:w-10 tooltip top">
                          <span
                            className={
                              user.scores[0].normal > 0 ? "tiptext" : "hidden"
                            }
                          >
                            {user.scores[0].normal + "点"}
                          </span>
                          <img
                            draggable={false}
                            alt=""
                            src="/difficulty_Normal.png"
                            className={
                              user.scores[0].normal > 0
                                ? "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 select-none pointer-events-none"
                                : "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 filter grayscale contrast-200 select-none pointer-events-none"
                            }
                          />
                        </div>
                        <div className="object-contain inline-block w-8 sm:w-10 tooltip top">
                          <span
                            className={
                              user.scores[0].hard > 0 ? "tiptext" : "hidden"
                            }
                          >
                            {user.scores[0].hard + "点"}
                          </span>
                          <img
                            draggable={false}
                            alt=""
                            src="/difficulty_Hard.png"
                            className={
                              user.scores[0].hard > 0
                                ? "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 select-none pointer-events-none"
                                : "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 filter grayscale contrast-200 select-none pointer-events-none"
                            }
                          />
                        </div>
                        <div className="object-contain inline-block w-8 sm:w-10 tooltip top">
                          <span
                            className={
                              user.scores[0].oni > 0 ? "tiptext" : "hidden"
                            }
                          >
                            {user.scores[0].oni + "点"}
                          </span>
                          <img
                            draggable={false}
                            alt=""
                            src="/difficulty_Oni.png"
                            className={
                              user.scores[0].oni > 0
                                ? "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 select-none pointer-events-none"
                                : "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 filter grayscale contrast-200 select-none pointer-events-none"
                            }
                          />
                        </div>
                        <div className="object-contain inline-block w-8 sm:w-10 tooltip top">
                          <span
                            className={
                              user.scores[0].uraoni > 0 ? "tiptext" : "hidden"
                            }
                          >
                            {user.scores[0].uraoni + "点"}
                          </span>
                          <img
                            draggable={false}
                            alt=""
                            src="/difficulty_UraOni.png"
                            className={
                              user.scores[0].uraoni > 0
                                ? "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 select-none pointer-events-none"
                                : "object-contain w-7 h-7 sm:w-8 sm:h-8 max-h-8 inline-block md:mx-1 filter grayscale contrast-200 select-none pointer-events-none"
                            }
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className="absolute hidden xl:inline scrollbar-hide overflow-hidden">
        <div
          className={
            playSubmitSound
              ? "fixed donimation w-[20rem] h-[35rem] paper_bounce -left-[3rem] top-[16rem] scrollbar-hide overflow-hidden"
              : "fixed donimation w-[20rem] h-[35rem] animate-bounce -left-[3rem] top-[16rem] scrollbar-hide overflow-hidden"
          }
        >
          <a
            href="https://www.youtube.com/watch?v=SxYBbTyPQLI"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-1/2 absolute cursor-default"
          ></a>
        </div>
        <div
          className={
            playSubmitSound
              ? pozolero
                ? "fixed donpozolero w-[20rem] h-[35rem] paper_bounce -left-[3rem] top-[36rem] scrollbar-hide overflow-hidden"
                : "fixed donimation2 w-[20rem] h-[35rem] paper_bounce -left-[3rem] top-[36rem] scrollbar-hide overflow-hidden"
              : pozolero
              ? "fixed donpozolero w-[20rem] h-[35rem] animate-bounce -left-[3rem] top-[36rem] scrollbar-hide overflow-hidden"
              : "fixed donimation2 w-[20rem] h-[35rem] animate-bounce -left-[3rem] top-[36rem] scrollbar-hide overflow-hidden"
          }
        >
          <button
            className="w-full h-1/2 absolute cursor-default"
            onClick={() => {
              setPozolero(!pozolero);
            }}
          />
        </div>
        <div
          className={
            playSubmitSound
              ? "fixed kanimation w-[20rem] h-[35rem] paper_bounce -right-[3rem] top-[16rem] scrollbar-hide overflow-hidden"
              : "fixed kanimation w-[20rem] h-[35rem] animate-bounce -right-[3rem] top-[16rem] scrollbar-hide overflow-hidden"
          }
        ></div>
        <div
          className={
            playSubmitSound
              ? "fixed kanimation2 w-[20rem] h-[35rem] paper_bounce -right-[3rem] top-[36rem] scrollbar-hide overflow-hidden"
              : "fixed kanimation2 w-[20rem] h-[35rem] animate-bounce -right-[3rem] top-[36rem] scrollbar-hide overflow-hidden"
          }
        ></div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("pantaiko").find({}).limit(20).toArray();

  const userjson = JSON.parse(JSON.stringify(data[0].user));
  const scorejson = JSON.parse(JSON.stringify(data[0].score_goal));

  const total = (user) => {
    if (user.scores.length === 0) return 0;
    const { easy, normal, hard, oni, uraoni } = user.scores[0];
    return easy + normal + hard + oni + uraoni;
  };
  const usersranked = userjson.sort((a, b) => total(b) - total(a)); //Eres un capo lpizzinidev

  return {
    props: {
      users: userjson,
      score_goal: scorejson,
      usersranked: usersranked,
    },
  };
}
