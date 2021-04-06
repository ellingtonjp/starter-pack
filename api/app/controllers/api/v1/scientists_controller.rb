class Api::V1::ScientistsController < ApplicationController
  before_action :set_scientist, only: [:show, :update, :destroy]

  # GET /scientists
  def index
    @scientists = Scientist.all

    render json: @scientists
  end

  # GET /scientists/1
  def show
    render json: @scientist
  end

  # POST /scientists
  def create
    @scientist = Scientist.new(scientist_params)

    if @scientist.save
      render json: @scientist, status: :created
    else
      render json: @scientist.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /scientists/1
  def update
    if @scientist.update(scientist_params)
      render json: @scientist
    else
      render json: @scientist.errors, status: :unprocessable_entity
    end
  end

  # DELETE /scientists/1
  def destroy
    @scientist.destroy
    puts @scientist.to_json
    render json: @scientist
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_scientist
      @scientist = Scientist.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def scientist_params
      params.require(:scientist).permit(:name, :fields, :dob, :bio)
    end
end
