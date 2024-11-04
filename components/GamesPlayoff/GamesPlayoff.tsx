import { ScrollView, View, Text } from "react-native";
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam } from "react-brackets";
import { PlayoffGame } from "@/types";
import HeaderModality from "../HeaderModality/HeaderModality";
import { useEffect, useState } from "react";
import api from "@/services/api";

const CustomSeed = ({ seed,  breakpoint, seedIndex }) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not
  // mobileBreakpoint is required to be passed down to a seed
  const homeTeam = seed.teams[0];
  const awayTeam = seed.teams[1];
  const date = seed.date;
  const local = seed.local;
  const time = seed.time;

  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <div>{`${local} - ${date} | ${time}`}</div>
      <SeedItem>
        <div>
          <SeedTeam
            style={{
              backgroundColor: homeTeam.score < awayTeam.score && "red"
            }}
            // onClick={() => alert(seedIndex)}
          >
            <div>
              <div>{homeTeam.label && homeTeam.label }</div>
              <div><b>{homeTeam.name ? `${homeTeam.name}` : "----"}</b></div>
            </div>
            <div>{homeTeam.score}</div>
          </SeedTeam>
          <SeedTeam
            style={{
              backgroundColor: homeTeam.score > awayTeam.score && "red"
            }}
          >
            <div>
              <div>{awayTeam.label && awayTeam.label }</div>
              <div><b>{awayTeam.name ? `${awayTeam.name}` : "----"}</b></div>
            </div>
            <div>{awayTeam.score}</div>
          </SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

const GamesPlayoff: React.FC = () => {
  const [playoffGames, setPlayoffGames] = useState<PlayoffGame[]>([]);

  const fetchData = async (modality: string[]) => {
    const playoffData = await api.getPlayoff(modality[0], modality[1]);
    setPlayoffGames(playoffData);
  }

  const handleOptionChange = async (value: string | undefined) => {
    if (value) {
      const data = value.split('/');
      fetchData(data);
    }
  };

  const generateRound = (games: PlayoffGame[]): IRoundProps[] => {
    const createTeam = (game: PlayoffGame, isHome: boolean) => ({
      id: isHome ? 1 : 2,
      name: isHome ? game.Mandante : game.Visitante,
      label: isHome ? game.LABEL_Mandante : game.LABEL_Visitante,
      score: isHome ? game.GOLS_MANDANTE : game.GOLS_VISITANTE
    });
  
    const createSeed = (game: PlayoffGame, id: number) => ({
      id,
      local: game.LOCAL,
      date: game.DIA,
      time: game.HORARIO,
      teams: [createTeam(game, true), createTeam(game, false)]
    });
  
    const createRound = (title: string, gameIndices: number[]) => ({
      title,
      seeds: gameIndices.map(index => createSeed(games[index], index + 1))
    });

    if(games.length == 12){
      return [
        createRound('pré 4as', [1, 2, 3, 0]), // pré - 4as
        createRound(games[4].FASE, [4, 6, 7, 5]), // 4as
        createRound(games[8].FASE, [8, 9]), // semi
        createRound(games[10].FASE, [10]), // final
        createRound(games[11].FASE, [11]) // 3o e 4o
      ];
    }
  
    return [
      createRound(games[0].FASE, [0]),
      createRound(games[1].FASE, [1, 2, 3, 4]),
      createRound(games[5].FASE, [5, 6]),
      createRound(games[7].FASE, [7]),
      createRound(games[8].FASE, [8])
    ];
  };

  useEffect(() => {
    fetchData(['FM', 'A']);
  }, []);

  return (
    <>
      <HeaderModality 
          onOptionChange={handleOptionChange}
        />
      <ScrollView>
        <View>
          {
            playoffGames.length > 0 &&
            <Bracket
            rounds={generateRound(playoffGames)}
            renderSeedComponent={CustomSeed}
            roundTitleComponent={(title, roundIndex: number) => {
              return (
                <div style={{ textAlign: "center", color: "purple" }}>{title}</div>
              );
            }}
          />
          }
        </View>
      </ScrollView>
    </>
  );
};

export default GamesPlayoff;

