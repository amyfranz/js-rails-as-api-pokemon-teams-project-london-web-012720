class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serialized_json
      end
     
      def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
      end

      def create
        trainer = Trainer.find_by(id: params["pokemon"]["trainer_id"])
        pokemon = Pokemon.create(nickname: Faker::Name.first_name,
          species: Faker::Games::Pokemon.name, trainer_id: params["pokemon"]["trainer_id"])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
      end

      def destroy
        pokemon = Pokemon.find_by(id: params["id"])
        pokemon.destroy;
        render json: PokemonSerializer.new(pokemon).to_serialized_json
      end
end
