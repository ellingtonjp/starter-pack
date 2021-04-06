require 'rails_helper'

RSpec.describe "Api::V1::Scientists", type: :request do
  describe "GET scientists" do
    it "returns http success" do
      get api_v1_scientists_path
      expect(response).to have_http_status(:success)
    end

    it 'returns valid JSON with a few test database entries' do
      scientists = []
      scientists.append(Scientist.create!(name: 'Richard Feynman'))
      scientists.append(Scientist.create!(name: 'Reinhard Genzel'))
      scientists.append(Scientist.create!(name: 'Jennifer Doudna'))

      get api_v1_scientists_path
      body = response.parsed_body

      expect(body.length).to eq(3)
      scientists.zip(body).each do |scientist, resp_scientist|
        # depends on order of creation being equal to order of response
        expect(scientist.id).to eq(resp_scientist['id'])
      end
    end
  end
end
