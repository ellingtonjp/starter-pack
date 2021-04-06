require 'rails_helper'

RSpec.describe Scientist, type: :model do
  it 'is invalid with a blank name' do
    expect(Scientist.new(name: '   ')).to be_invalid
  end

  it 'is invalid with a null name' do
    expect(Scientist.new(name: nil)).to be_invalid
  end

  it 'is valid with an alphanumeric name' do
    expect(Scientist.new(name: 'Richard Feynman')).to be_valid
  end

  it 'raises error on creating test with same name' do
    Scientist.create! name: 'Richard Feynman'
    expect { Scientist.create!(name: 'Richard Feynman') }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Name has already been taken')
  end
end
