#!/bin/env ruby
# frozen_string_literal: true

require 'every_politician_scraper/scraper_data'
require 'pry'

class MemberList
  class Member
    def name
      noko.css('.members-name').text.tidy
    end

    def position
      noko.css('.members-title').text.tidy
    end
  end

  class Members
    def member_container
      noko.css('.members-list .members-info')
    end
  end
end

file = Pathname.new 'html/official.html'
puts EveryPoliticianScraper::FileData.new(file).csv
