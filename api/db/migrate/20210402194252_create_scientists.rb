class CreateScientists < ActiveRecord::Migration[6.1]
  def change
    create_table :scientists do |t|
      t.string :name, null: false
      t.string :fields
      t.date :dob
      t.text :bio

      t.timestamps
    end

    add_index :scientists, :name, unique: true
  end
end
