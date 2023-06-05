//this component is to store game obj

import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";

const GameGrid = () => {
  const { data, error, isLoading } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6];
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      spacing={3}
      padding="10px"
    >
      {isLoading &&
        skeletons.map((Skeleton) => (
          <GameCardContainer>
            <GameCardSkeleton key={Skeleton} />
          </GameCardContainer>
        ))}
      {data.map((game) => (
        <GameCardContainer>
          <GameCard key={game.id} game={game}></GameCard>{" "}
          {/* shortcut '>wrap' as wrapper*/}
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
